import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(9),
  company: z.string().optional(),
  industry: z.string().min(1),
  message: z.string().optional(),
  locale: z.string().optional(),
});

async function notifyTelegram(lead: z.infer<typeof leadSchema>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = [
    "🆕 Yangi ariza — MIC Agency",
    `👤 Ism: ${lead.name}`,
    `📞 Telefon: ${lead.phone}`,
    lead.company ? `🏢 Kompaniya: ${lead.company}` : null,
    `📂 Soha: ${lead.industry}`,
    lead.message ? `📝 Izoh: ${lead.message}` : null,
    lead.locale ? `🌐 Til: ${lead.locale}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

async function notifyCrmWebhook(lead: z.infer<typeof leadSchema>) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lead = leadSchema.parse(body);

    // Fire notifications in parallel. Each is a no-op if its env var is unset,
    // so the form works immediately and gains channels as you configure them.
    await Promise.allSettled([notifyTelegram(lead), notifyCrmWebhook(lead)]);

    // TODO: persist to a database if you want a durable lead record
    // beyond Telegram/CRM (e.g. Postgres via Prisma, or a Google Sheet).

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead submission failed:", error);
    return NextResponse.json(
      { ok: false, error: "Invalid submission" },
      { status: 400 }
    );
  }
}
