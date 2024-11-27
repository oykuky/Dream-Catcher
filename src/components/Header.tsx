"use client";
import React from "react";
import SparklesText from "@/components/ui/sparkles-text";
// import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Link, routing, usePathname } from "@/i18n";
import { useLocale } from "next-intl";

const Header = () => {
  const t = useTranslations();
  const token = localStorage.getItem("token");
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const locales = routing.locales; // tr,en
  const otherLocale = locales.filter((l) => locale !== l)[0];
  const language = locale == "tr" ? "TR" : "EN";

  const logOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="bg-gray-950 flex flex-row justify-between items-center w-full mb-10 py-10 px-5">
      <div className="flex justify-center items-center pl-14">
        <SparklesText text="Dream Catcher" />
      </div>
      <div className="flex flex-0 items-center justify-evenly gap-7 px-5 text-white font-semibold text-2xl ">
        <Link
          href={"/dreamLibrary"}
          className="text-white hover:text-neonPink hover:underline transition-colors duration-200"
        >
          {t("header.mydreams")}
        </Link>
        {token ? (
          <Link
            onClick={logOut}
            href={"/login"}
            className="text-white hover:text-neonPink hover:underline transition-colors duration-200"
          >
            {t("header.logout")}
          </Link>
        ) : null}
        <Link
          className="flex rounded-lg items-center justify-center border-[2px] border-pink-700 hover:bg-neonPink w-10 h-10 font-semibold text-white text-center"
          href={pathname}
          locale={otherLocale}
        >
          {language}
        </Link>
      </div>
    </div>
  );
};

export default Header;
