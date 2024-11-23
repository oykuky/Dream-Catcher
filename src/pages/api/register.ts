import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import connectToDb from "@/lib/utils";
import { User } from "@/lib/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    const { username, email, password, passwordRepeat } = req.body as {
      username: string;
      email: string;
      password: string;
      passwordRepeat: string;
    };

    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    if (password !== passwordRepeat) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
      await connectToDb();
      const existingUser = await User.findOne({ email });
      console.log("existing user", existingUser);

      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      if (!hashedPassword) {
        res.status(500).json({ message: "Password hashing failed" });
        return;
      }
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      console.log("new user", newUser);

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
