import React from 'react'

export interface SupplierFormData {
  name: string
  code: string
  phone: string
  email: string
  address: string
  note: string
}

interface SupplierDetailFormProps {
  formData: SupplierFormData
  onChange: <K extends keyof SupplierFormData>(field: K, value: SupplierFormData[K]) => void
  isEditMode: boolean
}

export const SupplierDetailForm: React.FC<SupplierDetailFormProps> = ({
  formData,
  onChange,
  isEditMode,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Tên nhà cung cấp */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Tên nhà cung cấp <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Nhập tên nhà cung cấp..."
          className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Mã nhà cung cấp */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Mã nhà cung cấp {isEditMode && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          value={formData.code}
          onChange={(e) => onChange('code', e.target.value.toUpperCase())}
          placeholder={isEditMode ? "Ví dụ: NCC001..." : "Để trống hệ thống sẽ tự sinh (NCC-xxx)"}
          className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono uppercase"
        />
      </div>

      {/* Số điện thoại */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Số điện thoại
        </label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="0901234567"
          className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="contact@nhacungcap.vn"
          className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Địa chỉ */}
      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Địa chỉ
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => onChange('address', e.target.value)}
          placeholder="Địa chỉ văn phòng hoặc kho hàng..."
          className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Ghi chú */}
      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Ghi chú
        </label>
        <textarea
          rows={3}
          value={formData.note}
          onChange={(e) => onChange('note', e.target.value)}
          placeholder="Chính sách chiết khấu, điều khoản giao hàng..."
          className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  )
}