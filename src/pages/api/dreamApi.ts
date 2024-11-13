import type { NextApiRequest, NextApiResponse } from "next";
import { Dream } from "@/lib/models";
import connectToDb from "@/lib/utils";
// import { getSession } from "next-auth/react";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("reqqq method",req.method)
  console.log("reqqq BODYYYYYY",req.body)
  if (req.method === "POST") {
    try {
      await connectToDb();
      // const session = await getSession({ req });
      // if (!session) {
      //   console.log("Unauthorized");
      //   return res.status(401).json({ message: "Unauthorized" });
      // }

      const {
        content,
        keywords,
        interpretation,
        mood,
        emotionalAnalysis,
        practicalAdvice,
        symbols,
      } = req.body;

      const dream = await Dream.create({
        // userId: session.user.id, 
        userId: new mongoose.Types.ObjectId(), //geçiçi oturum işlemleri tamamlanana kadar
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
    return res.status(500).json({ error: "Yanlıs istek." });
  }
}

//   try {
//     await connectToDb();

//     const session = await getSession({ req });
//     if (!session) {
//         console.log('Unauthorized')
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const {
//       content,
//       keywords,
//       interpretation,
//       mood,
//       emotionalAnalysis,
//       practicalAdvice,
//       symbols,
//     } = req.body;

//     const dream = await Dream.create({
//         userId: session.user.id,

//       content,
//       keywords,
//       interpretation,
//       mood,
//       emotionalAnalysis,
//       practicalAdvice,
//       symbols,
//       createdAt: new Date(),
//     });

//     res.status(201).json(dream);
//   } catch (error) {
//     console.error("Error saving dream:", error);
//     res.status(500).json({ message: "Error saving dream" });
//   }
// } }
