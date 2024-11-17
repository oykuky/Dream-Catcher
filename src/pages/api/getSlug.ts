import type { NextApiRequest, NextApiResponse } from "next";
import { getDream } from "@/lib/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { slug } = req.query;
      console.log("SLUGGG in handler",slug)
      if (!slug) {
        return res.status(400).json({ error: "Slug gerekli" });
      }

      const dream = await getDream(String(slug)); 
      if (!dream) {
        return res.status(404).json({ error: "Rüya bulunamadı" });
      }

      res.status(200).json(dream);
    } catch (err) {
      console.error("Error fetching dream:", err);
      res.status(500).json({ error: "Failed to fetch dream" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
