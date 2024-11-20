"use client";
import DreamDetail from "@/components/DreamDetail";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

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

export default function Dream({ params }: { params: { slug: string } }) {
  const [loading, setLoading] = useState(true);
  const [dream, setDream] = useState<IntDream | null>(null);


  async function fetchDream(slug: string) {
    try {
      const response = await fetch(`/api/getSlug?slug=${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Dream not fetching");
      }
      const data : IntDream = await response.json();
      setDream(data);
    } catch (err) {
      console.error("Hata:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (params.slug) {
      fetchDream(params.slug);
    }
  }, [params.slug]);

 

  return (
    <div className="">
    {loading ? (
      <div className="animate-spin text-neonPink text-4xl">
        <FaSpinner />
      </div>
    ) : dream ? (
      <DreamDetail dream={dream} />
    ) : (
      <div>Dream not found</div>
    )}
  </div>
  );
}
