"use client";
import RegisterForm from "@/components/RegisterForm";
import ShineBorder from "@/components/ui/shine-border";
import React from "react";
import { Link, routing, usePathname } from "@/i18n";
import { useLocale } from "next-intl";

function register() {
  const locale = useLocale();
  const pathname = usePathname();
  const locales = routing.locales; // tr,en
  const otherLocale = locales.filter((l) => locale !== l)[0];
  const language = locale == "tr" ? "TR" : "EN";

  return (
    <div className="flex justify-center items-center h-screen px-8 ">
      <ShineBorder
        className="flex items-center justify-center rounded-lg border-none bg-gray-950 md:shadow-xl py-10 lg:px-20 md:px-10 sm:px-8 px-5 w-full max-w-[31.25rem]"
        color={["#5c2ed1", "#c40446", "#710e87"]}
      >
        <RegisterForm />
      </ShineBorder>
      <Link
        className="mt-auto mb-4 flex rounded-lg items-center justify-center border-[2px] border-pink-700 hover:bg-neonPink w-10 h-10 font-semibold text-white text-center"
        href={pathname}
        locale={otherLocale}
      >
        {language}
      </Link>
    </div>
  );
}

export default register;
