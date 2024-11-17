"use client";
import { useEffect, useState } from "react";

export interface IntDream {
  _id: number;
  content: string;
  keywords: string[];
  interpretation: string;
  mood?: string;
  emotionalAnalysis: string;
  practicalAdvice: string;
  symbols: { symbol: string; meaning: string }[];
}

export default function Dream({ params }: { params: { slug: number } }) {
  const [loading, setLoading] = useState(true);
  const [dream, setDream] = useState<IntDream | null>(null);

  async function fetchDream(slug: number) {
    try {
      const response = await fetch(`/api/getSlug?slug=${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Rüya getirilemedi");
      }
      const data = await response.json();
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

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div>
      <h1>Rüya Detayları</h1>
      {dream ? (
        <div>
          <p><strong>İçerik:</strong> {dream.content}</p>
          <p><strong>Yorum:</strong> {dream.interpretation}</p>
        </div>
      ) : (
        <p>Rüya bulunamadı.</p>
      )}
    </div>
  );
}

