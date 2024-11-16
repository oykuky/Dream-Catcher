"use client";
import { useEffect, useState } from "react";
import DreamCard from "@/components/DreamCard";
import SparklesText from "@/components/ui/sparkles-text";
import { IDream } from "@/lib/models";

export default function DreamLibrary() {
  const [dreams, setDreams] = useState<IDream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      setError("Rüyalar yüklenirken bir hata oluştu");
      console.error("Hata:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDreams();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen gap-12 p-4">
      <div className="bg-transparent flex justify-center items-center w-full max-w-2xl h-20 rounded-2xl border-[4px] mt-5 mb-10 border-violet-500">
        <div className="flex justify-center items-center my-5">
          <SparklesText text="Rüyalarım" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-9">
        {dreams.map((dream, index) => (
          <DreamCard key={index} dream={dream} />
        ))}
      </div>

      {dreams.length === 0 && (
        <div className="text-center text-red-500">Rüya bulunamadı</div>
      )}
    </div>
  );
}
