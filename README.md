# Quản Lý Mua Hàng & Sản Phẩm (Purchase Orders & Product Management System)

Ứng dụng web quản lý đơn mua hàng, sản phẩm và nhà cung cấp, hỗ trợ xác thực JWT và phân quyền người dùng (Role-Based Access Control - RBAC).

---

## 🛠 Công nghệ sử dụng

- **Frontend Core:** React, TypeScript, Vite
- **UI & Styling:** Tailwind CSS, Lucide React (Icons)
- **State Management:** Redux Toolkit
- **Server State & Caching:** TanStack React Query (v5)
- **Routing:** React Router DOM (v6)
- **HTTP Client:** Axios

---

## ⚙️ Yêu cầu môi trường

- **Node.js:** phiên bản 18.x trở lên
- **Backend API:** Máy chủ backend chạy tại cổng `http://localhost:3000`

---

## 🚀 Cài đặt & Chạy ứng dụng

### 1. Tải mã nguồn về máy
```bash
git clone <URL_REPO_CỦA_BẠN>
cd <TÊN_THƯ_MỤC_DỰ_ÁN>
```
### 2.Cài đặt các gói phụ thuộc
```bash
npm install
```

### 3. Cấu hình biến môi trường
```bash

DATABASE_URL="mysql://root:your_password@localhost:3306/warehouse_management"
PRISMA_CLIENT_ENGINE_TYPE="binary"
JWT_SECRET="your_jwt_secret_key_here"
JWT_EXPIRES_IN="7d"
```

### 4. Khởi chạy ứng dụng (backend va frond )
```bash
npm run dev
```

# Tài khoản thử nghiệm (Test Accounts)



| Vai trò (Role) | Tài khoản / Email | Mật khẩu | |
| :--- | :--- | :--- | :--- |
| **Admin** | `Admin`<br>`admin@gmail.com` | 123456 
| **Staff (Nhân viên)** | `Bang`<br>`nnb24.112003@gmail.com` | 123456 