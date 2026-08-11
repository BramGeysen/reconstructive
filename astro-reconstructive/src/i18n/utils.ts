import defaultLangJson from "./en.json";
import nlLangJson from "./nl.json";

export const defaultLang = "nl";
export const showDefaultLang = false;

export const languages = {
  en: "English",
  nl: "Nederlands",
} as const;

// Combined dictionary containing your JSON files
export const ui = {
  en: defaultLangJson,
  nl: nlLangJson,
} as const;

export type Lang = keyof typeof ui;

// Type helper to extract dot-notation paths (e.g. "home.quote.author")
type NestedKeys<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? `${K}` | `${K}.${NestedKeys<T[K]>}`
        : `${K}`;
    }[keyof T & string]
  : never;

export type TranslationKey = NestedKeys<typeof defaultLangJson>;

// Helper function to dynamically access nested keys safely
function getNestedValue(
  obj: Record<string, any>,
  keyPath: string,
): string | undefined {
  const result = keyPath
    .split(".")
    .reduce<any>((acc, part) => acc && acc[part], obj);
  return typeof result === "string" ? result : undefined;
}

export function getStaticPaths() {
  return Object.keys(languages).map((locale) => ({
    params: { locale: locale === defaultLang ? undefined : locale },
  }));
}

export function getLangFromUrl(url: URL): Lang {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  let pathname = url.pathname;
  if (base && pathname.startsWith(base)) {
    pathname = pathname.slice(base.length);
  }
  const [, lang] = pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang as Lang;
}

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    const translation = getNestedValue(ui[lang], key);
    if (translation !== undefined) return translation;

    // Fallback to default language if key isn't found in current language
    const fallback = getNestedValue(ui[defaultLang], key);
    return fallback ?? key;
  };
}

export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, l: string = lang) {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");

    const prefix = showDefaultLang || l !== defaultLang ? `/${l}` : "";
    const cleanedPath = path.startsWith("/") ? path : `/${path}`;

    let fullPath = `${base}${prefix}${cleanedPath}`;
    fullPath = fullPath.replace(/\/+/g, "/");

    // 1. Separate the URL path from any query parameters (?) or anchors (#)
    const [pathPart, ...hashParts] = fullPath.split("#");
    const hash = hashParts.length > 0 ? `#${hashParts.join("#")}` : "";

    const [cleanPathOnly, ...queryParts] = pathPart.split("?");
    const query = queryParts.length > 0 ? `?${queryParts.join("?")}` : "";

    // 2. Apply trailing slash ONLY to the path portion
    let finalPath = cleanPathOnly;
    if (!finalPath.endsWith("/") && !/\.[a-z0-9]+$/i.test(finalPath)) {
      finalPath += "/";
    }

    return `${finalPath}${query}${hash}`;
  };
}

export function getRouteFromUrl(url: URL) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  let pathname = url.pathname;
  if (base && pathname.startsWith(base)) {
    pathname = pathname.slice(base.length);
  }
  const parts = pathname.split("/").filter(Boolean);

  if (parts[0] in languages) {
    parts.shift();
  }

  return parts.join("/") || undefined;
}
