import type { NextApiRequest, NextApiResponse } from "next";;
import { getDreams } from "@/lib/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === "GET") {
    try {
      const dreams = await getDreams();
      res.status(201).json(dreams);
    } catch (err) {
        console.error("Error fetching dreams:", err);
        res.status(500).json({ error: "Failed to fetch dreams" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }

}
