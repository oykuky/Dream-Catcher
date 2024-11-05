import {getRequestConfig} from 'next-intl/server';
import { routing } from './index';
import { notFound } from 'next/navigation';
 
export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
 
  // Ensure that a valid locale is used
  if (!routing.locales.includes(locale as any)) notFound();
 
  return {
    locale,
    messages: (await import(`./${locale}.ts`)).default
  };
});