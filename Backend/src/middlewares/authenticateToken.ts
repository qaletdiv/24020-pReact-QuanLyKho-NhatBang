import jwt from 'jsonwebtoken';
import { type Request, type Response, type NextFunction } from 'express';
import { prisma } from '../config/prisma.js';

export interface AuthUser {
    id: number;
    username: string;
    email: string;
    role: string;
}


declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}

export type AuthenticatedRequest = Request;

interface DecodePayload {
    id: number;
    username: string;
    email?: string;
    role: string;
}

export const authenticateToken = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Yêu cầu token xác thực không hợp lệ!' });
        return;
    }

    const secretKey = process.env.JWT_SECRET || 'default_secret';

    jwt.verify(token, secretKey, async (err, decodePayload) => {
        if (err) {
            if (err instanceof jwt.TokenExpiredError) {
                res.status(401).json({ message: 'Token đã hết hạn!' });
                return;
            }
            res.status(403).json({ message: 'Token không hợp lệ!' });
            return;
        }

        const payload = decodePayload as DecodePayload;
        const userId = payload.id;

        if (!userId) {
            res.status(403).json({ message: 'Token không hợp lệ!' });
            return;
        }

        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(userId),
                },
            });

            if (!user) {
                res.status(401).json({ message: 'Xác thực thất bại! Tài khoản không tồn tại.' });
                return;
            }

            req.user = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            };

            next();
        } catch (error) {
            console.error('Lỗi truy vấn người dùng trong Authenticate Token:', error);
            res.status(500).json({ message: 'Lỗi hệ thống khi xác thực!' });
        }
    });
};

export const authorizeRoles = (...allowedRoles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({ message: 'Người dùng chưa được xác thực!' });
            return;
        }

        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                message: `Bạn không có quyền thực hiện thao tác này! Yêu cầu quyền: ${allowedRoles.join(', ')}`,
            });
            return;
        }

        next();
    };
};

export default authenticateToken;