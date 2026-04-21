import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

declare global {
  namespace Express {
    interface Request { user?: any }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  // console.log(">>>>",req);
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({message: "Missing or invalid Authorization header"});
  }
  // console.log("HEADER>>", header);
  const token = header.split(' ')[1];
  // console.log("TOKEN>>", token);

  if (!token) {
    return res.status(401).json({message: "Invalid Authorization format"});
  }

  try {
    // console.log("1>>>",token, JWT_SECRET)
    const payload = jwt.verify(token, JWT_SECRET);
    // console.log("1>>>>",payload);
    req.user = payload;
    // console.log("REQ USER>>>", req.user);
    next()
  } catch (err) {
    res.status(401).json({message: "Invalid or expired token"});
  }
}