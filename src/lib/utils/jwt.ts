import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

interface TokenPayload {
  id: string;
  username: string;
}

export function signToken(payload: TokenPayload, expiresIn: string = '1h'): string {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
}

export function verifyToken(token: string): JwtPayload | string {
  return jwt.verify(token, secret);
}
