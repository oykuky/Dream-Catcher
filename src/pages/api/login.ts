import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import connectToDb from "@/lib/utils";
import { User } from "@/lib/models";
import { signToken } from "@/lib/utils/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };
    if (!username || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    try {
      await connectToDb();
      const user = await User.findOne({ username });
      if (!user) {
        res
          .status(401)
          .json({ message: "Invalid credentials: User not found" });
        return;
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const token = signToken({
        id: user._id.toString(),
        username: user.username,
      });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
