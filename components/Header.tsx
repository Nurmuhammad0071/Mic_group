import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

export default function Header({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-ink/85 backdrop-blur-sm">
      <div className="container-content flex h-16 items-center justify-between">
        <Logo locale={locale} />

        <nav className="hidden items-center gap-8 md:flex">
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
        </nav>

        <div className="flex items-center gap-6">
          <LanguageSwitcher locale={locale} />
          <a
            href="#lead-form"
            className="hidden rounded bg-gold px-4 py-2 text-sm font-medium text-ink transition-colors duration-150 hover:bg-gold-bright sm:inline-block"
          >
            {dict.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
