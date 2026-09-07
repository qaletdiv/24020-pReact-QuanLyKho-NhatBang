import { type Request, type Response } from 'express';
import { prisma } from '../config/prisma.js';

export const checkInventory = async (req: Request, res: Response) => {
    try {
        const keyword = typeof req.query.keyword === 'string' ? req.query.keyword.trim() : '';
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.max(1, Number(req.query.limit) || 10);
        const skip = (page - 1) * limit;

        const whereCondition: any = {};

        if (keyword) {
            whereCondition.OR = [
                { code: { contains: keyword } },
                { name: { contains: keyword } },
            ];
        }

        const [totalItems, products] = await Promise.all([
            prisma.product.count({ where: whereCondition }),
            prisma.product.findMany({
                where: whereCondition,
                select: {
                    id: true,
                    code: true,
                    name: true,
                    size: {
                        select: {
                            sizeName: true,
                        },
                    },
                    inventory: {
                        select: {
                            quantity: true,
                        },
                    },
                },
                skip,
                take: limit,
                orderBy: { code: 'asc' },
            }),
        ]);

        const formattedProducts = products.map((item) => ({
            id: item.id,
            code: item.code,
            name: item.name,
            sizeName: item.size?.sizeName || null,
            stock: item.inventory?.quantity ?? 0,
        }));

        return res.status(200).json({
            data: formattedProducts,
            pagination: {
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
                limit,
            },
        });
    } catch (error: any) {
        console.error('Lỗi khi tra cứu tồn kho:', error);
        return res.status(500).json({
            message: 'Lỗi hệ thống khi tra cứu tồn kho!',
            detail: error?.message,
        });
    }
};