
"use client";

import React, { useEffect, useState } from "react";
import SparklesText from "@/components/ui/sparkles-text";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Link, routing, usePathname } from "@/i18n";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const locales = routing.locales; // tr,en
  const otherLocale = locales.filter((l) => locale !== l)[0];
  const language = locale == "tr" ? "TR" : "EN";
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

useEffect(() => {
  const storedToken = localStorage.getItem("token");
  setToken(storedToken);
}, []);

  const logOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const NavItems = () => (
    <>
      <Link
        href="/dreamLibrary"
        className="text-white hover:text-neonPink hover:underline transition-colors duration-200"
      >
        {t("header.mydreams")}
      </Link>
      {token && (
        <Link
          onClick={logOut}
          href="/login"
          className="text-white hover:text-neonPink hover:underline transition-colors duration-200"
        >
          {t("header.logout")}
        </Link>
      )}
      <Link
        className="flex rounded-lg items-center justify-center border-2 border-pink-700 hover:bg-neonPink w-10 h-10 font-semibold text-white text-center"
        href={pathname}
        locale={otherLocale}
      >
        {language}
      </Link>
    </>
  );

  return (
    <div className="bg-gray-950 w-full justify-center flex py-4">
      <div className="px-4 md:px-10 flex flex-row justify-between w-full items-center">
        <div className="flex justify-center items-center">
          <SparklesText text="Dream Catcher" className="font-light text-left" />
        </div>
        <div className="hidden md:flex flex-0 items-center justify-evenly gap-7 text-white font-semibold text-2xl">
          <NavItems />
        </div>
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[400px] bg-gray-950 text-white border-r border-gray-800"
            >
              <div className="flex flex-col items-start space-y-4 mt-16">
                <NavItems />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;

