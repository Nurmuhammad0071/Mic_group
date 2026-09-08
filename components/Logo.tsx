import Image from "next/image";
import type { Locale } from "@/lib/i18n-config";

export default function Logo({
  size = "header",
}: {
  locale: Locale;
  size?: "header" | "footer";
}) {
  const height = size === "header" ? 36 : 52;

  return (
    <a
      href="#top"
      className="inline-flex items-center"
      aria-label="MIC Agency"
    >
      <Image
        src="/logo.png"
        alt="MIC Agency"
        width={307}
        height={186}
        priority={size === "header"}
        className="w-auto"
        style={{ height }}
      />
    </a>
  );
}
