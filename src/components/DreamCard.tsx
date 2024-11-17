"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { IntDream } from "@/app/[locale]/dreamLibrary/page";
import { useRouter } from "next/navigation";



interface DreamCardProps {
  dream: IntDream;
}

const DreamCard: React.FC<DreamCardProps> = ({ dream }) => {
  const t = useTranslations();
  const router = useRouter();
  return (
    <div onClick={()=>{router.push(`/${dream.slug}`)}} className="flex flex-col w-[30rem] mr-3 bg-transparent rounded-2xl p-5 gap-4 border-[0.2rem] border-purple-700 shadow-md hover:shadow-2xl shadow-purple-400 hover:shadow-neonPink  hover:scale-105 duration-500 cursor-pointer">
      <h2 className="justify-center flex font-semibold text-xl text-darkPink line-clamp-4">
        ‧˚☾ ☁️⋅˚‧{" "}
        <h1 className="font-bold text-2xl px-2 text-white"> {t("dreamLibrary.cardContent")} </h1>{" "}
        ‧˚⋅☁️ ☾˚
      </h2>
      <h2 className="line-clamp-2">{dream.content}</h2>

      <div className="space-y-3">
        <h1 className="font-semibold text-xl shadow-md w-fit border-none">
          {t("dreamLibrary.cardKeywords")}
        </h1>

        <div className="flex justify-start">
          {dream.keywords.map((k: string, index: number) => (
            <div key={index}>
              <h2 className="w-fit bg-lightPink rounded-full px-2 mx-1 font-medium">
                {k}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <h2 className="font-semibold text-xl">{t("dreamLibrary.cardMood")}</h2>
      <p className="line-clamp-1">{dream.mood}</p>

      <h3 className="text-xl font-semibold ">{t("dreamLibrary.cardSymbols")}</h3>
      <div className="space-y-3">
        {dream.symbols.map(
          (symbol: { symbol: string; meaning: string }, index: number) => (
            <div
              className="rounded-xl bg-darkLila p-3 hover:scale-105 duration-500"
              key={index}
            >
              <h4 className="font-medium w-fit bg-lightPink rounded-full px-3 mb-2">
                {symbol.symbol}
              </h4>
              <p className="text-gray-300 line-clamp-2">
                <h2 className="text-gray-100">✩ {t("dreamLibrary.cardMeanings")} ✩ </h2>
                {symbol.meaning}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DreamCard;
//✩₊˚.⋆☾☾⋆⁺₊✧ ‧˚☾ ☁️⋅♡⋅˚‧
