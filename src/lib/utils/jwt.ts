import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

interface TokenPayload {
  id: string;
  username: string;
}
interface CustomJwtPayload extends JwtPayload {
  id: string;
  username: string;
}

//jwt oluşturma
export function signToken(payload: TokenPayload, expiresIn: string = '1h'): string {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions); //Token imzalama
}

export function verifyToken(token: string): CustomJwtPayload {
  return jwt.verify(token, secret) as CustomJwtPayload; // Cast to CustomJwtPayload
}