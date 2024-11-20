"use client";
import { useEffect, useState } from "react";
import DreamCard from "@/components/DreamCard";
import SparklesText from "@/components/ui/sparkles-text";
import { FaSpinner } from "react-icons/fa";
import { TbHomeStar } from "react-icons/tb";
import { useRouter } from "next/navigation";

export interface IntDream {
  slug:string;
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

  async function fetchDreams() {
    try {
      const response = await fetch("/api/getDream", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
    <div className="flex flex-col items-center min-h-screen gap-6 p-4 bg-gradient-to-tl from-neonPink via-purple-900 to-black">
      <button
        onClick={() => router.push("/")}
        className=" text-neonPink text-4xl cursor-pointer rounded-full bg-white p-2 hover:shadow-pink-700 hover:shadow-lg"
      >
        <TbHomeStar />
      </button>
      <div className="bg-transparent flex justify-center items-center w-full max-w-2xl h-20 ">
        <div className="flex justify-center items-center my-5">
          <SparklesText text="Rüyalarım" />
        </div>
      </div>
      {loading ? (
        <div className="animate-spin text-neonPink text-5xl">
          <FaSpinner />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-9">
          {dreams.map((dream, index:number) => (
            <DreamCard key={index} dream={dream} />
          ))}
        </div>
      )}
    </div>
  );
}
