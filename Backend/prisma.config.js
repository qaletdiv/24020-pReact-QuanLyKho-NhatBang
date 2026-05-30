import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";

// Nạp biến môi trường từ file .env vào process.env
dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Truyền URL kết nối MySQL trực tiếp ở đây theo đúng chuẩn Prisma 7
    url: process.env.DATABASE_URL,
  },
});