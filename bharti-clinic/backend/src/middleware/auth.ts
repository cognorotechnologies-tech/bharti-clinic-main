import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { sendError } from '../lib/http';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';

export interface AdminJwtPayload extends jwt.JwtPayload {
    sub: string;
    email: string;
    role: string;
}

declare module 'express-serve-static-core' {
    interface Request {
        admin?: {
            id: string;
            email: string;
            role: string;
        };
    }
}

export function generateAdminToken(admin: { id: string; email: string; role: string }) {
    return jwt.sign(
        {
            sub: admin.id,
            email: admin.email,
            role: admin.role,
        },
        JWT_SECRET,
        {
            expiresIn: '24h',
        }
    );
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return sendError(res, 401, 'Authorization header missing or malformed');
    }

    const token = authHeader.slice(7).trim();

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as AdminJwtPayload;

        req.admin = {
            id: decoded.sub,
            email: decoded.email,
            role: decoded.role,
        };

        return next();
    } catch (error) {
        return sendError(res, 401, 'Invalid or expired token');
    }
}

