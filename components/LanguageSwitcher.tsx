"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales, localeLabels, type Locale } from "@/lib/i18n-config";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          <Link
            href={`/${l}${rest ? `/${rest}` : ""}`}
            className={`px-1.5 py-1 transition-colors duration-150 ${
              l === locale
                ? "text-gold"
                : "text-paper-dim hover:text-paper"
            }`}
            aria-current={l === locale ? "true" : undefined}
          >
            {localeLabels[l]}
          </Link>
          {i < locales.length - 1 && (
            <span className="text-line-strong">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
