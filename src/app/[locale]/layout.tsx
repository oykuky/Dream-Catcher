import type { Metadata } from "next";
import "@/styles/globals.css"
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n";

export const metadata: Metadata = {
  title: "Dream Catcher",
  description: "your dream catched",
};

export default async function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  {
    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
      notFound();
    }
   
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
         <NextIntlClientProvider messages={messages}>
          {children}
        <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
}