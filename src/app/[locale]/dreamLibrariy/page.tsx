import DreamCard from "@/components/DreamCard";
import SparklesText from "@/components/ui/sparkles-text";
import React from "react";

export interface IntDream {
  content: string;
  keywords: string[];
  interpretation: string;
  mood?: string;
  emotionalAnalysis: string;
  practicalAdvice: string;
  symbols: { symbol: string; meaning: string }[];
}

function DreamLibrary() {
  //Fetch dreams func. yaz
  const dream: IntDream = {
    content: "Arkadaşlarımla sahil kenarına eğlenceli bir piknik yapıyorduk.",
    keywords: ["deniz","kum"],
    interpretation:
      "This dream symbolizes a period of joy, relaxation, and connection with loved ones. It suggests a need for escape from daily stresses and a desire for carefree fun and camaraderie.",
    mood: "The overall mood of the dream is positive, joyful, and carefree. It suggests a period of peace and contentment.",
    emotionalAnalysis:
      "The dream evokes a sense of happiness, relaxation, and contentment. It suggests a positive emotional state and a feeling of peace and harmony.",
    practicalAdvice:
      "This dream could be a reminder to take time for yourself and enjoy the simple pleasures in life. It may encourage you to spend more time with friends and loved ones, to relax and unwind, and to seek out experiences that bring you joy. It may also suggest that you are ready for a new adventure or a fresh start.",
    symbols: [
      {
        symbol: "Beach",
        meaning:
          "The beach represents a place of freedom, openness, and a fresh start. It can symbolize a need for a break from routine and a desire for emotional cleansing.",
      },
      {
        symbol: "sea",
        meaning:
          "The beach represents a place of freedom, openness, and a fresh start. It can symbolize a need for a break from routine and a desire for emotional cleansing.",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center h-screen gap-12">
      <div className="bg-transparent flex justify-center items-center w-2/4 h-20 rounded-2xl border-[4px] mt-5 mb-10 border-violet-500 ">
          <div className="flex justify-center items-center my-5">
            <SparklesText text="My Dreams" />
          </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        <DreamCard dream={dream} />
        <DreamCard dream={dream} />
        <DreamCard dream={dream} />
      </div>
    </div>
  );
}

export default DreamLibrary;
