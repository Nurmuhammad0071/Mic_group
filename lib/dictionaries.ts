import "server-only";
import type { Locale } from "./i18n-config";

const dictionaries = {
  uz: () => import("../dictionaries/uz.json").then((m) => m.default),
  ru: () => import("../dictionaries/ru.json").then((m) => m.default),
  en: () => import("../dictionaries/en.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => {
  const loader = dictionaries[locale] ?? dictionaries.uz;
  return loader();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
