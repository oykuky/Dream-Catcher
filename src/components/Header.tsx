"use client";
import React from "react";
import SparklesText from "@/components/ui/sparkles-text";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "@/i18n";

const Header = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();


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
          className="text-white hover:text-purple-400 hover:underline transition-colors duration-200"
        >
          {t("header.mydreams")}
        </Link>
        <Link
          onClick={logOut}
          href={"/login"}
          className="text-white hover:text-purple-400 hover:underline transition-colors duration-200"
        >
          {t("header.logout")}
        </Link>
       
    
      </div>
    </div>
  );
};

export default Header;
