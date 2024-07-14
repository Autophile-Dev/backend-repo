import { Request, Response, NextFunction } from "express";
import admin from 'firebase-admin';


declare global {
    namespace Express {
        interface Request {
            user?: admin.auth.DecodedIdToken;
        }
    }
}
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decodeToken = await admin.auth().verifyIdToken(token);
        req.user = decodeToken;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid Token' });
    }
};

export default authMiddleware;