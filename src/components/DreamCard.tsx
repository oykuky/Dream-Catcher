"use client";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { IntDream } from "@/app/[locale]/dreamLibrary/page";

interface DreamCardProps {
  dream: IntDream;
}

const DreamCard: React.FC<DreamCardProps> = ({ dream }) => {
  return (
    <div className="flex flex-col w-[30rem] bg-transparent rounded-2xl p-5 gap-3 border-[0.2rem] border-purple-700 shadow-md hover:shadow-2xl shadow-purple-400 hover:shadow-pink-600  hover:scale-105 duration-300 cursor:pointer">
      <div className="">
        <h1 className="font-bold">Content</h1>
        <h2>{dream.content}</h2>
      </div>

      <div className="space-y-3">
        <h1 className="font-bold shadow-md shadow-pink-600 w-fit border-none">Keywords</h1>

        <div className="flex justify-start">
          {dream.keywords.map((k, index) => (
            <div key={index}>
              <h2 className="w-fit rounded-full px-2 mx-1 font-medium">
                {k}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <p>{dream.mood}</p>

      <h3 className="text-lg font-medium">Symbols</h3>
      <div className="space-y-2">
        {dream.symbols.map((symbol, index) => (
          <div key={index}>
            <h4 className="font-medium">{symbol.symbol}</h4>
            <p className="text-gray-300">{symbol.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DreamCard;
