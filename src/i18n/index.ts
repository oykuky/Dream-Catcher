import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export { default as tr } from "./tr";
export { default as en } from "./en";

export type LocaleType = "tr" | "en";
export const defaultLocale: LocaleType = "tr";
export const defaultTimeZone = "Europe/Istanbul";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "tr"],

  // Used when no locale matches
  defaultLocale: defaultLocale,

  localePrefix: "as-needed",


});

export type Locales = typeof routing.locales;

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
