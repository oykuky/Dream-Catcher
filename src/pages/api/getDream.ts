import type { NextApiRequest, NextApiResponse } from "next";;
import { getDreams } from "@/lib/data";
import { verifyToken } from "@/lib/utils/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === "GET") {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "No token provided" });
      }

      const decoded = verifyToken(token);
      const userId = decoded.id;

      const dreams = await getDreams(userId);
      res.status(201).json(dreams);
    } catch (err) {
        console.error("Error fetching dreams:", err);
        res.status(500).json({ error: "Failed to fetch dreams" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }

}
