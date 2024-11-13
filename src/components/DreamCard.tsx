'use client'
import React from 'react'
import { useLocale, useTranslations } from "next-intl";
import { IntDream } from '@/app/[locale]/dreamLibrary/page';

  
  interface DreamCardProps {
    dream: IntDream;
  }
  
  const DreamCard: React.FC<DreamCardProps> = ({ dream }) => {
    return (
      <div>
        <h2>{dream.content}</h2>
        <p>{dream.interpretation}</p>
        
      </div>
    );
  };
  
  export default DreamCard;