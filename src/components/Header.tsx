"use client";
import React from "react";
import SparklesText from "@/components/ui/sparkles-text";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations();
  const locale = useLocale()
  return (
    <div className="bg-gray-950 flex flex-col justify-center items-center w-3/4 rounded-2xl border-[3px] border-purple-800 mt-5 mb-10 ">
      <div className="flex flex-col text-center font-bold gap-5">
        <div className="flex justify-center items-center my-5">
          <SparklesText text="Dream Catcher" />
        </div>
        <div className="mb-5">
          <Link
            href={`${locale}/dreamLibrary`}
            className="text-white hover:text-purple-400 transition-colors duration-200"
          >
            {t("header.mydreams")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
