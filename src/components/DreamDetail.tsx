'use client'

import { IntDream } from "@/app/[locale]/dreamLibrary/[slug]/page"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import React from "react"
import { TbHomeStar } from "react-icons/tb"
import { IoIosArrowBack } from "react-icons/io"
import { motion } from "framer-motion"

interface DreamCardProps {
  dream: IntDream
}

const DreamDetail: React.FC<DreamCardProps> = ({ dream }) => {
  const t = useTranslations()
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center gap-8 p-4 md:p-8 bg-gradient-to-tl from-neonPink via-darkLila to-black text-white overflow-y-auto"
    >
      <nav className="flex justify-between w-full max-w-7xl">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/dreamLibrary")}
          className="text-pink-300 flex items-center justify-center text-3xl w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
        
        >
          <IoIosArrowBack />
        </motion.button>
        <p>✩₊˚.⋆☾⋆⁺₊✧</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/")}
          className="text-pink-300 flex items-center justify-center text-3xl w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"

        >
          <TbHomeStar />
        </motion.button>
      </nav>

      <main className="flex flex-col gap-8 w-full max-w-4xl">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center font-bold text-4xl md:text-5xl text-pink-100 mb-4"
        >
          {t("dreamLibrary.cardContent")}
        </motion.h1>

        <div className="bg-slate-800/50 backdrop-blur-md rounded-lg p-6">
          <h2 className="text-2xl text-pink-200 mb-4">{t("dreamLibrary.cardContent")}</h2>
          <p className="text-gray-200 font-medium text-lg leading-relaxed">{dream.content}</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-md rounded-lg p-6">
          <h2 className="text-2xl text-pink-200 mb-4">{t("dreamLibrary.interpretation")}</h2>
          <p className="text-gray-200 font-medium text-lg leading-relaxed">{dream.interpretation}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-neonPink/25 backdrop-blur-md shadow-inner shadow-neonPink rounded-xl p-6">
            <h2 className="text-xl text-pink-200 mb-4">{t("dreamLibrary.emotionalAnalysis")}</h2>
            <p className="text-gray-200 font-medium text-lg">{dream.emotionalAnalysis}</p>
          </div>
          <div className="bg-neonPink/25 backdrop-blur-md shadow-inner shadow-neonPink rounded-xl p-6">
            <h2 className="text-xl text-pink-200 mb-4">{t("dreamLibrary.practicalAdvice")}</h2>
            <p className="text-gray-200 font-medium text-lg">{dream.practicalAdvice}</p>
          </div>
        </div>

        <section>
          <h3 className="font-semibold text-2xl text-pink-200 mb-4">{t("dreamLibrary.cardKeywords")}</h3>
          <div className="flex flex-wrap gap-2">
            {dream.keywords.map((k: string, index: number) => (
              <span key={index} className="bg-pink-300/30 text-pink-100 text-sm py-2 px-3 rounded-full">
                {k}
              </span>
            ))}
          </div>
        </section>

        <div className="bg-slate-800/50 backdrop-blur-md rounded-lg p-6">
          <h2 className="text-2xl text-pink-200 mb-4">{t("dreamLibrary.cardMood")}</h2>
          <p className="text-gray-200 font-medium text-lg">{dream.mood}</p>
        </div>

        <section>
          <h3 className="text-2xl font-semibold text-pink-200 mb-4">{t("dreamLibrary.cardSymbols")}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {dream.symbols.map((symbol: { symbol: string; meaning: string }, index: number) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-md rounded-lg p-6 hover:bg-slate-700/50 transition-colors duration-300">
                <h4 className="text-xl text-pink-200 mb-2">{symbol.symbol}</h4>
                <p className="text-gray-200 font-medium text-lg">{symbol.meaning}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </motion.div>
  )
}

export default DreamDetail