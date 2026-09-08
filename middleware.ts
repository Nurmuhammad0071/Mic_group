import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./lib/i18n-config";

function getLocaleFromHeader(request: NextRequest): string {
  const acceptLang = request.headers.get("accept-language");
  if (!acceptLang) return defaultLocale;

  const preferred = acceptLang.split(",")[0]?.split("-")[0];
  if (preferred && (locales as readonly string[]).includes(preferred)) {
    return preferred;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  const locale = getLocaleFromHeader(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
