import { type Request, type Response } from "express";
import { prisma } from "../config/prisma.js";


export const getProducts = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.query;
    const whereCondition: any = {};

    if (keyword && typeof keyword === "string") {
      whereCondition.OR = [
        { name: { contains: keyword.trim() } },
        { code: { contains: keyword.trim() } },
      ];
    }

    const products = await prisma.product.findMany({
      where: whereCondition,
      include: {
        size: {
          select: { sizeName: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedProducts = products.map((item) => ({
      id: item.id,
      name: item.name,
      code: item.code,
      price: Number(item.price),
      description: item.description,
      sizeId: item.sizeId,
      sizeName: item.size?.sizeName || null,
      imageUrl: item.imageUrl,
    }));

    return res.status(200).json(formattedProducts);
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm:", error);
    return res.status(500).json({ message: "Lỗi hệ thống phía Server!" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productId = Number(id);

    if (isNaN(productId)) {
      return res.status(400).json({ message: "ID sản phẩm không hợp lệ!" });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        size: {
          select: { id: true, sizeName: true },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
    }

    return res.status(200).json({
      ...product,
      price: Number(product.price),
      sizeName: product.size?.sizeName || null,
    });
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    return res.status(500).json({ message: "Lỗi hệ thống phía Server!" });
  }
};


export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, code, price, description, sizeId, imageUrl } = req.body;

    if (!name || !code) {
      return res
        .status(400)
        .json({ message: "Tên và Mã sản phẩm không được để trống!" });
    }

    const trimmedCode = String(code).trim();

    const existingProduct = await prisma.product.findUnique({
      where: { code: trimmedCode },
    });

    if (existingProduct) {
      return res
        .status(400)
        .json({ message: `Mã sản phẩm "${trimmedCode}" đã tồn tại!` });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: String(name).trim(),
        code: trimmedCode,
        price: price ? Number(price) : 0,
        description: description || "",
        sizeId: sizeId ? Number(sizeId) : null,
        imageUrl: imageUrl || "",
      },
    });

    return res.status(201).json({
      message: "Tạo sản phẩm thành công!",
      product: {
        ...newProduct,
        price: Number(newProduct.price),
      },
    });
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi tạo sản phẩm!" });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productId = Number(id);

    if (isNaN(productId)) {
      return res.status(400).json({ message: "ID sản phẩm không hợp lệ!" });
    }

    const { name, code, price, description, sizeId, imageUrl } = req.body;

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm cần cập nhật!" });
    }

    if (code) {
      const trimmedCode = String(code).trim();
      const duplicateCode = await prisma.product.findFirst({
        where: {
          code: trimmedCode,
          NOT: { id: productId },
        },
      });

      if (duplicateCode) {
        return res
          .status(400)
          .json({ message: `Mã sản phẩm "${trimmedCode}" đã được sử dụng!` });
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        ...(name && { name: String(name).trim() }),
        ...(code && { code: String(code).trim() }),
        ...(price !== undefined && { price: Number(price) }),
        ...(description !== undefined && { description: String(description) }),
        ...(sizeId !== undefined && { sizeId: sizeId ? Number(sizeId) : null }),
        ...(imageUrl !== undefined && { imageUrl: String(imageUrl) }),
      },
      include: {
        size: {
          select: { sizeName: true },
        },
      },
    });

    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công!",
      product: {
        ...updatedProduct,
        price: Number(updatedProduct.price),
        sizeName: updatedProduct.size?.sizeName || null,
      },
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    return res
      .status(500)
      .json({ message: "Lỗi hệ thống khi cập nhật sản phẩm!" });
  }
};

export const getProductSizes = async (_req: Request, res: Response) => {
  try {
    const sizes = await prisma.productSize.findMany({
      orderBy: { id: "asc" },
    });
    return res.status(200).json(sizes);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách quy cách:", error);
    return res.status(500).json({ message: "Lỗi hệ thống phía Server!" });
  }
};