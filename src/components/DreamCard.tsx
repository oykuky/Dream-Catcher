"use client";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { IntDream } from "@/app/[locale]/dreamLibrariy/page";


interface DreamCardProps {
  dream: IntDream;
}

const DreamCard: React.FC<DreamCardProps> = ({ dream }) => {
  return (
    <div className="flex flex-col w-[30rem] bg-transparent rounded-2xl p-5 gap-3 border-[0.2rem] border-purple-700 shadow-md hover:shadow-2xl shadow-purple-400 hover:shadow-neonPink  hover:scale-105 duration-300 cursor:pointer">
      <div className="">
        <h1 className="font-semibold text-xl text-darkPink">Content</h1>
        <h2>{dream.content}</h2>
      </div>

      <div className="space-y-3">
        <h1 className="font-semibold text-xl shadow-md w-fit border-none">Keywords</h1>

        <div className="flex justify-start">
          {dream.keywords.map((k: string, index:number) => (
            <div key={index}>
              <h2 className="w-fit bg-lightPink rounded-full px-2 mx-1 font-medium">
                {k}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <p>{dream.mood}</p>

      <h3 className="text-xl font-semibold ">Symbols</h3>
      <div className="space-y-3">
        {dream.symbols.map((symbol: { symbol: string; meaning: string }, index: number) => (
          <div className="rounded-xl bg-neonLila p-3 my-2" key={index}>
            <h4 className="font-medium w-fit bg-lightPink rounded-full px-3">{symbol.symbol}</h4>
            <p className="text-gray-300">{symbol.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DreamCard;
