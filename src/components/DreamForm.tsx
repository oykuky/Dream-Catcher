'use client'
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import React, { useState } from "react";
import { interpretDream } from "@/service/AiModal";
import { useToast } from "@/hooks/use-toast";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

// import { AiOutlineLoading3Quarters } from "react-icons/ai";

function DreamForm() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [dreamTxt, setDreamTxt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const t = useTranslations();
  const locale = useLocale(); // Aktif dil alınır
  const router = useRouter();

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
  
    try {
      setIsLoading(true);
      
      const interpretation = await interpretDream(dreamTxt, keywords, locale);
      // console.log("Yorumlama sonucu:", interpretation);
      
      
      const response = await fetch('/api/dreamApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: dreamTxt,
          keywords: keywords,
          interpretation: interpretation.generalInterpretation,
          mood: interpretation.mood,
          emotionalAnalysis: interpretation.emotionalAnalysis,
          practicalAdvice: interpretation.practicalAdvice,
          symbols: interpretation.symbols
        }),
      });
      

      setDreamTxt("");
      setKeywords([]);
      
      if (!response.ok) {
        throw new Error('Rüya kaydedilemedi');
      }

      toast({
        title: "Başarılı!",
        description: "Rüyanız yorumlandı ve kaydedildi.",
      });

      router.push(`${locale}/dreamLibrary`)
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
     <NeonGradientCard className="hover:scale-105 transition duration-300 max-w-2xl h-[580px] flex items-center justify-center text-center mt-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 p-2 text-white font-semibold">
          <span className=" text-slate-200 text-center font-semibold">
            {t("dreamform.dreamText")}
          </span>
          <textarea
            placeholder={t("dreamform.dreamTextPlacehld")}
            value={dreamTxt}
            onChange={(e) => setDreamTxt(e.target.value)}
            className="min-h-36 pl-2 bg-transparent rounded-lg shadow-pink-500 shadow-sm border-s-fuchsia-200 focus:border-pink-600 focus:border-2 outline-none"
          />

          <span className=" text-slate-200 text-center font-semibold">
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
            className="text-white rounded-xl text-md font-semibold px-5 py-3 mt-12 text-center bg-transparent border-pink-500 border-t-2 shadow-md shadow-pink-500 hover:scale-105 hover:bg-violet-900 duration-300 transition ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t("dreamform.buttonLoading") : t("dreamform.button") }
            {/* {isLoading ? "Yorumlanıyor..." : "Rüyayı Yorumla"} */}
          </button>
        </form>
      </NeonGradientCard>
    </>
  );
}

export default DreamForm;
