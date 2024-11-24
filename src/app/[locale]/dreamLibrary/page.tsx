"use client";
import { useEffect, useState } from "react";
import DreamCard from "@/components/DreamCard";
import SparklesText from "@/components/ui/sparkles-text";
import { FaSpinner } from "react-icons/fa";
import { TbHomeStar } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { useTranslations } from "next-intl";

export interface IntDream {
  slug: string;
  content: string;
  keywords: string[];
  interpretation: string;
  mood?: string;
  emotionalAnalysis: string;
  practicalAdvice: string;
  symbols: { symbol: string; meaning: string }[];
}

export default function DreamLibrary() {
  const [dreams, setDreams] = useState<IntDream[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const t = useTranslations();

  
  async function fetchDreams() {
    try {
      const token = localStorage.getItem("token"); 
      if (!token) {
        return router.push("/login"); 
      }

      const response = await fetch("/api/getDream", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error("Rüyalar getirilemedi");
      }

      const data = await response.json();
      setDreams(data);
    } catch (err) {
      console.error("Hata:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDreams();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center min-h-screen gap-6 p-4 bg-gradient-to-tl from-neonPink via-darkLila to-black"
    >
      <nav className="flex justify-between w-full max-w-7xl">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/")}
          className="text-pink-300 flex items-center justify-center text-3xl w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
        >
          <IoIosArrowBack />
        </motion.button>
      </nav>

      <div className="bg-transparent flex justify-center items-center w-full max-w-2xl mb-5">
        <div className="flex justify-center items-center">
          <SparklesText text={t("dreamLibrary.mydreamsTitle")} />
        </div>
      </div>
      {loading ? (
        <div className="animate-spin text-neonPink text-5xl">
          <FaSpinner />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-9">
          {dreams.map((dream, index: number) => (
            <DreamCard key={index} dream={dream} fetchDreams={fetchDreams} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
