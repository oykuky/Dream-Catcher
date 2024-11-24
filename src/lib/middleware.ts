import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "./utils/jwt";

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    username: string;
  };
}

export function withAuth(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token) as { id: string; username: string };

      req.user = {
        id: decoded.id,
        username: decoded.username,
      };

      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}




