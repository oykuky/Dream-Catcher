import { Dream } from "./models";
import connectToDb from "./utils";

export const getDreams = async () => {
  try {
    console.log("Veritabanına bağlanılıyor...");
    await connectToDb();
    console.log("Veritabanına bağlandı, rüyalar çekiliyor...");
    const dreams = await Dream.find();
    return dreams;
  } catch (err) {
    console.error("Rüyaları çekerken hata oluştu:", err);
    throw err;
  }
};