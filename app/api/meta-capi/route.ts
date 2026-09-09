import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  event_id: z.string().min(1),
  event_source_url: z.string().url().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function hashEmail(email?: string) {
  if (!email) return undefined;
  return sha256(email.trim().toLowerCase());
}

function hashPhone(phone?: string) {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, "");
  if (!digits) return undefined;
  if (digits.startsWith("0") && digits.length === 10) {
    digits = `998${digits.slice(1)}`;
  } else if (digits.length === 9) {
    digits = `998${digits}`;
  }
  return sha256(digits);
}

function clientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    undefined
  );
}

export async function POST(request: NextRequest) {
  try {
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
    if (!pixelId || !accessToken) {
      console.error("Meta CAPI is missing META_PIXEL_ID or META_CAPI_ACCESS_TOKEN");
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    const payload = bodySchema.parse(await request.json());
    const em = hashEmail(payload.email);
    const ph = hashPhone(payload.phone);

    const user_data: Record<string, unknown> = {
      client_ip_address: clientIp(request),
      client_user_agent: request.headers.get("user-agent") ?? undefined,
    };
    if (em) user_data.em = [em];
    if (ph) user_data.ph = [ph];

    const response = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              event_name: "Lead",
              event_time: Math.floor(Date.now() / 1000),
              event_id: payload.event_id,
              action_source: "website",
              event_source_url: payload.event_source_url,
              user_data,
            },
          ],
        }),
      }
    );

    const metaResponse = await response.json();
    console.log("Meta CAPI response:", metaResponse);

    if (!response.ok) {
      console.error("Meta CAPI request failed:", response.status, metaResponse);
      return NextResponse.json({ ok: false, meta: metaResponse }, { status: 502 });
    }

    return NextResponse.json({ ok: true, meta: metaResponse });
  } catch (error) {
    console.error("Meta CAPI submission failed:", error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
