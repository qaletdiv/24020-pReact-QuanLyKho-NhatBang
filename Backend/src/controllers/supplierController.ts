import { type Request, type Response } from 'express'
import { prisma } from '../config/prisma.js'

export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.query;
    const whereCondition: any = {};

    if (keyword && typeof keyword === 'string' && keyword.trim() !== '') {
      whereCondition.OR = [
        { name: { contains: keyword.trim()} },
        { code: { contains: keyword.trim() } },
      ];
    }

    const suppliers = await prisma.supplier.findMany({
      where: whereCondition,
      orderBy: { id: 'desc' },
    });

    return res.status(200).json(suppliers);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách nhà cung cấp:', error);
    return res.status(500).json({ message: 'Lỗi hệ thống khi lấy danh sách!' });
  }
};
export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID nhà cung cấp không hợp lệ!' });
    }

    const supplier = await prisma.supplier.findUnique({
      where: { id },
    });

    if (!supplier) {
      return res.status(404).json({ message: 'Không tìm thấy nhà cung cấp!' });
    }

    return res.status(200).json(supplier);
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết nhà cung cấp:', error);
    return res.status(500).json({ message: 'Lỗi hệ thống phía Server!' });
  }
};
export const createSupplier = async (req: Request, res: Response) => {
    try {
        const { name, code, phone, email, address } = req.body

        if (!name || !String(name).trim()) {
            return res.status(400).json({ message: 'Tên nhà cung cấp không được để trống!' })
        }

        let finalCode = code ? String(code).trim() : ''


        if (!finalCode) {
            const lastSupplier = await prisma.supplier.findFirst({
                orderBy: { id: 'desc' },
            });
            const nextId = (lastSupplier?.id || 0) + 1;
            finalCode = `NCC-${String(nextId).padStart(3, '0')}`;
        } else {

            const existingSupplier = await prisma.supplier.findUnique({
                where: { code: finalCode },
            })
            if (existingSupplier) {
                return res.status(400).json({ message: `Mã nhà cung cấp "${finalCode}" đã tồn tại!` })
            }
        }

        const newSupplier = await prisma.supplier.create({
            data: {
                name: String(name).trim(),
                code: finalCode,
                phone: phone ? String(phone).trim() : '',
                email: email ? String(email).trim() : '',
                address: address ? String(address).trim() : '',
            },
        })

        return res.status(201).json({
            message: 'Tạo nhà cung cấp thành công!',
            supplier: newSupplier,
        })
    } catch (error) {
        console.error('Lỗi khi tạo nhà cung cấp:', error)
        return res.status(500).json({ message: 'Lỗi hệ thống khi tạo nhà cung cấp!' })
    }
}
export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, phone, email, address } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID nhà cung cấp không hợp lệ!' });
    }

    const existing = await prisma.supplier.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Không tìm thấy nhà cung cấp để cập nhật!' });
    }

    const updatedSupplier = await prisma.supplier.update({
      where: { id },
      data: {
        name: name ? String(name).trim() : existing.name,
        phone: phone !== undefined ? String(phone).trim() : existing.phone,
        email: email !== undefined ? String(email).trim() : existing.email,
        address: address !== undefined ? String(address).trim() : existing.address,
      },
    });

    return res.status(200).json({
      message: 'Cập nhật nhà cung cấp thành công!',
      supplier: updatedSupplier,
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật nhà cung cấp:', error);
    return res.status(500).json({ message: 'Lỗi hệ thống khi cập nhật!' });
  }
};

export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID nhà cung cấp không hợp lệ!' });
    }

    const hasOrders = await prisma.purchaseOrder.findFirst({
      where: { supplierId: id },
    });

    if (hasOrders) {
      return res.status(400).json({
        message: 'Không thể xóa nhà cung cấp đã có phát sinh Đơn mua hàng trong hệ thống!',
      });
    }

    await prisma.supplier.delete({ where: { id } });

    return res.status(200).json({ message: 'Xóa nhà cung cấp thành công!' });
  } catch (error) {
    console.error('Lỗi khi xóa nhà cung cấp:', error);
    return res.status(500).json({ message: 'Lỗi hệ thống khi xóa nhà cung cấp!' });
  }
};