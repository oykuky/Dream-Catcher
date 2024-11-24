import type { NextApiResponse } from "next";
import { Dream } from "@/lib/models";
import connectToDb from "@/lib/utils";
import { AuthenticatedRequest, withAuth } from "@/lib/middleware";


async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectToDb();

      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const {
        slug,
        content,
        keywords,
        interpretation,
        mood,
        emotionalAnalysis,
        practicalAdvice,
        symbols,
      } = req.body;

      const dream = await Dream.create({
        userId: req.user.id,
        slug,
        content,
        keywords,
        interpretation,
        mood,
        emotionalAnalysis,
        practicalAdvice,
        symbols,
        createdAt: new Date(),
      });

      res.status(201).json(dream);
    } catch (err) {
      console.error("Error saving dream:", err);
      res.status(500).json({ message: "Error saving dream" });
    }
  } else {
    return res.status(500).json({ error: "Wrong Request." });
  }
}

export default withAuth(handler);