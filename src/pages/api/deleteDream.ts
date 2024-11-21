import type { NextApiRequest, NextApiResponse } from "next";
import { deleteDream } from "@/lib/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { slug } = req.body;
      if (!slug) {
        return res.status(400).json({ error: "Slug is required" });
      }
      await deleteDream(slug);
      res.status(200).json({ message: "Dream deleted successfully" });
    } catch (err) {
      console.error("Error deleting dream:", err);
      res.status(500).json({ error: "Failed to delete dream" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
