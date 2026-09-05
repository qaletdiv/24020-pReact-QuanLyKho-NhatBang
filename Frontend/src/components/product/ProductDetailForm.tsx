import React, { useState } from 'react'
import type { ProductSizeOption } from '../../api/products'
import { AddSizeModal } from './AddSizeModal'

export interface ProductFormData {
  name: string
  code: string
  price: number
  description: string
  sizeId: number | ''
  imageUrl: string
}

interface ProductDetailFormProps {
  formData: ProductFormData
  onChange: <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => void
  sizes: ProductSizeOption[]
  isEditMode: boolean
}

export const ProductDetailForm: React.FC<ProductDetailFormProps> = ({
  formData,
  onChange,
  sizes,
  isEditMode,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tên sản phẩm */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Tên sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Ví dụ: Sơn lót chống rỉ, Sơn phủ bóng..."
            className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Mã sản phẩm */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Mã sản phẩm (Code) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.code}
            disabled={isEditMode}
            onChange={(e) => onChange('code', e.target.value.toUpperCase())}
            placeholder="Ví dụ: SP001, PAINT-5L..."
            className={`w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono uppercase transition-all ${
              isEditMode
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-white text-gray-900'
            }`}
          />
          {isEditMode && (
            <p className="text-xs text-gray-400 mt-1">Mã sản phẩm không thể thay đổi sau khi tạo</p>
          )}
        </div>

        {/* Đơn giá */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Đơn giá nhập / tham khảo (VNĐ)
          </label>
          <input
            type="number"
            min="0"
            value={formData.price}
            onChange={(e) => onChange('price', Math.max(0, Number(e.target.value)))}
            placeholder="0"
            className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Quy cách / Kích cỡ + Nút thêm nhanh */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              Quy cách / Kích cỡ
            </label>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
            >
              + Thêm quy cách
            </button>
          </div>
          <select
            value={formData.sizeId}
            onChange={(e) => onChange('sizeId', e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="">-- Chọn kích cỡ / quy cách --</option>
            {sizes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.sizeName}
              </option>
            ))}
          </select>
        </div>

        {/* Link hình ảnh */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Đường dẫn ảnh sản phẩm (Image URL)
          </label>
          <input
            type="text"
            value={formData.imageUrl}
            onChange={(e) => onChange('imageUrl', e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Mô tả chi tiết */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Mô tả sản phẩm
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Đặc tính kỹ thuật, định mức tiêu hao, lưu ý bảo quản..."
            className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Modal popup thêm nhanh */}
      <AddSizeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccessCreated={(newSize) => {
          // Tự động chọn quy cách vừa tạo vào ô select
          onChange('sizeId', newSize.id)
        }}
      />
    </>
  )
}