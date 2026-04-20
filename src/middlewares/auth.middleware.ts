import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        res.status(401).json({message: "Missing or invalid Authorization header"});
        return;
    }
    console.log(header);
    const token = header.split(' ')[1];
    console.log(token);

    if (!token) {
        return res.status(401).json({message: "Invalid Authorization format"});
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        console.log(payload); 
        next()
    } catch (err) {
        res.status(401).json({message: "Invalid or expired token"});
    }

}