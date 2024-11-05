import type { LocalizationKeys } from "./src/i18n/tr";

declare global {
  interface IntlMessages extends LocalizationKeys {}
}

export {};

