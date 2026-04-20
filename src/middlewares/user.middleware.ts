import { Request, Response, NextFunction } from 'express';

export const hasReaderRole = (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (err) {
        res.status(401).json({message: "Invalid or expired token"});
    }
}