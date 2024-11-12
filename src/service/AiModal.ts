import { GoogleGenerativeAI } from "@google/generative-ai";
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI  = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY as string );


export async function interpretDream(dreamText: string, keywords: string[], language:string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `${language === "tr" ? "Lütfen aşağıdaki rüyayı yorumlayın ve detaylı bir analiz sağlayın (Türkçe):" : "Please interpret the following dream and provide a detailed analysis:"}

Dream Content: ${dreamText}
Keywords: ${keywords.join(', ')}

Please provide the interpretation in the following JSON structure:
{
  "generalInterpretation": "Overall meaning of the dream",
  "symbols": [
    {
      "symbol": "Key symbol from dream",
      "meaning": "Interpretation of this symbol"
    }
  ],
  "emotionalAnalysis": "Emotional significance",
  "practicalAdvice": "Practical suggestions or life applications",
  "keywords": "Analysis of provided keywords",
  "mood": "Overall mood or tone of the dream"
}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let interpretation = await response.text();
  interpretation = interpretation.replace(/```json|```/g, '').trim(); //yanıtın sadece JSON kısmı alınması içinn

  try {
    return JSON.parse(interpretation); 
  } catch (error) {
    console.error("JSON ayrıştırma hatası:", error);
    throw new Error("AI yanıtı beklenen JSON formatında değil.");
  }
}