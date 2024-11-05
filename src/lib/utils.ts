import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import mongoose from "mongoose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const connectToDb  = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("using existing connection");
    return; 
  }
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO as string);
    console.log("Veritabanına başarıyla bağlandı");
  } catch (error) {
    console.error("Veritabanına bağlanırken hata oluştu:", error);
    throw new Error("Veritabanına bağlanırken hata oluştu");
  }
};

export default connectToDb ;

