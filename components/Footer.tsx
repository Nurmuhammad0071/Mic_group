import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";
import { Phone, Send, Instagram } from "lucide-react";
import Logo from "./Logo";

const PHONE_DISPLAY = "+998 90 131 62 23";
const PHONE_TEL = "+998901316223";
const TELEGRAM_BOT = "https://t.me/micagencybot";
const INSTAGRAM = "https://www.instagram.com/micagency.uz/";

export default function Footer({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <footer className="py-16 md:py-20">
      <div className="container-content grid gap-12 md:grid-cols-[1fr_1fr_1fr]">
        <div>
          <Logo locale={locale} size="footer" />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper-dim">
            {dict.footer.tagline}
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm text-paper-faint">{dict.footer.contact}</p>
          <div className="flex flex-col gap-3">
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-2.5 text-sm text-paper-dim transition-colors hover:text-gold"
            >
              <Phone size={15} />
              {PHONE_DISPLAY}
            </a>
            <a
              href={TELEGRAM_BOT}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-paper-dim transition-colors hover:text-gold"
            >
              <Send size={15} />
              @micagencybot
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-paper-dim transition-colors hover:text-gold"
            >
              <Instagram size={15} />
              @micagency.uz
            </a>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm text-paper-faint">{dict.footer.nav}</p>
          <div className="flex flex-col gap-3">
            <a
              href="#services"
              className="text-sm text-paper-dim transition-colors hover:text-paper"
            >
              {dict.nav.services}
            </a>
            <a
              href="#why"
              className="text-sm text-paper-dim transition-colors hover:text-paper"
            >
              {dict.nav.why}
            </a>
            <a
              href="#process"
              className="text-sm text-paper-dim transition-colors hover:text-paper"
            >
              {dict.nav.process}
            </a>
          </div>
        </div>
      </div>

      <div className="container-content mt-12 flex flex-col-reverse items-start gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-paper-faint">
          © {new Date().getFullYear()} MIC Agency. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
