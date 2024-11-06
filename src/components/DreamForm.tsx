'use client'
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import React, { useState } from "react";
import { interpretDream } from "@/service/AiModal";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";

function DreamForm() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [dreamTxt, setDreamTxt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const t = useTranslations();

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setKeywords(inputValue.split(",").map((keyword) => keyword.trim()));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dreamTxt.trim() || keywords.length === 0) {
      toast({
        title: "Hata",
        description: "Lütfen rüyanızı ve en az bir anahtar kelime girin.",
        variant: "destructive",
      });
      return;
    }
    console.log("yorumlama öncesi satırrrr")
    try {
      setIsLoading(true);
      
      // Gemini AI'dan yorumu al
      const interpretation = await interpretDream(dreamTxt, keywords);
      console.log("interpretation ciktiiii",interpretation);

      // MongoDB'ye kaydet
      const response = await fetch('/api/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: dreamTxt,
          keywords: keywords,
          interpretation: interpretation,
          mood: interpretation.mood,
        }),
      });

      if (!response.ok) {
        throw new Error('Rüya kaydedilemedi');
      }

      toast({
        title: "Başarılı!",
        description: "Rüyanız yorumlandı ve kaydedildi.",
      });

      // Formu temizle
      setDreamTxt("");
      setKeywords([]);
      
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Hata",
        description: "Rüya yorumlanırken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

//   <div className="flex justify-center items-center mt-10">
//   <div className="loader">
//    <AiOutlineLoading3Quarters className="animate-spin text-4xl"/>
//   </div>
// </div> 

  return (
    <>
     <NeonGradientCard className="max-w-2xl h-[580px] flex items-center justify-center text-center mt-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 p-2 text-white">
          <span className="pointer-events-none h-full whitespace-pre-wrap bg-gradient-to-br text-slate-300 from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center font-semibold leading-none tracking-tighter dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            {t("dreamform.dreamText")}
          </span>
          <textarea
            placeholder={t("dreamform.dreamTextPlacehld")}
            value={dreamTxt}
            onChange={(e) => setDreamTxt(e.target.value)}
            className="min-h-36 pl-2 bg-transparent rounded-lg shadow-pink-500 shadow-sm border-s-fuchsia-200 focus:border-pink-600 focus:border-2 outline-none"
          />

          <span className="pointer-events-none h-full whitespace-pre-wrap bg-gradient-to-br text-slate-300 from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center font-semibold leading-none tracking-tighter dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            {t("dreamform.keywords")}
          </span>
          <input
            value={keywords.join(", ")}
            className="bg-transparent h-9 pl-2 rounded-lg shadow-pink-500 shadow-sm focus:border-pink-600 focus:border-2 outline-none"
            placeholder={t("dreamform.keywordsPlacehld")}
            onChange={handleKeywordsChange}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="text-white rounded-xl text-md font-semibold px-5 py-3 mt-12 text-center bg-gray-950 border-pink-500 border-t-2 shadow-md shadow-pink-500 hover:scale-105 hover:bg-violet-900 duration-300 transition ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* {isLoading ? t("dreamform.buttonLoading") : t("dreamform.button") } */}
            {isLoading ? "Yorumlanıyor..." : "Rüyayı Yorumla"}
          </button>
        </form>
      </NeonGradientCard>
      {/* <NeonGradientCard className="max-w-2xl h-[580px] flex items-center justify-center text-center mt-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 p-2 text-white">
          <span className="pointer-events-none h-full whitespace-pre-wrap bg-gradient-to-br text-slate-300 from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center font-semibold leading-none tracking-tighter dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            Rüyanızı Anlatın
          </span>
          <textarea
            placeholder="Rüyanızı detaylı bir şekilde anlatın..."
            value={dreamTxt}
            onChange={(e) => setDreamTxt(e.target.value)}
            className="min-h-36 pl-2 bg-transparent rounded-lg shadow-pink-500 shadow-sm border-s-fuchsia-200 focus:border-pink-600 focus:border-2 outline-none"
          />

          <span className="pointer-events-none h-full whitespace-pre-wrap bg-gradient-to-br text-slate-300 from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center font-semibold leading-none tracking-tighter dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            Anahtar Kelimeler
          </span>
          <input
            value={keywords}
            className="bg-transparent h-9 pl-2 rounded-lg shadow-pink-500 shadow-sm focus:border-pink-600 focus:border-2 outline-none"
            placeholder="Örn:  kalp, deniz, ay (virgülle ayırın)"
            onChange={handleKeywordsChange}
          />
          <button
            type="submit"
            className="text-white rounded-xl text-md font-semibold px-5 py-3 mt-12 text-center bg-gray-950 border-pink-500 border-t-2 shadow-md shadow-pink-500 hover:scale-105 hover:bg-violet-900 duration-300 transition ease-in-out"
          >
            Rüyayı Yorumla
          </button>
        </form>
      </NeonGradientCard> */}
    </>
  );
}

export default DreamForm;
