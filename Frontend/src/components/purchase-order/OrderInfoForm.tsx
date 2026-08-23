import React from 'react'
export interface SupplierOption {
  id: number
  name: string
  code: string
}
interface OrderInfoFormProps {
  supplierId: number | ''
  setSupplierId: (id: number) => void
  staffName: string
  issueDate: string
  setIssueDate: (date: string) => void
  note: string
  setNote: (note: string) => void
  suppliers: SupplierOption[]
  isReadOnly: boolean
}

export const OrderInfoForm: React.FC<OrderInfoFormProps> = ({
  supplierId,
  setSupplierId,
  staffName,
  issueDate,
  setIssueDate,
  note,
  setNote,
  suppliers,
  isReadOnly,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nhà cung cấp <span className="text-red-500">*</span>
        </label>
        <select
          value={supplierId}
          disabled={isReadOnly}
          onChange={(e) => setSupplierId(Number(e.target.value))}
          className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 text-sm"
        >
          <option value="">-- Chọn Nhà cung cấp --</option>
          {suppliers.map((sup) => (
            <option key={sup.id} value={sup.id}>
              {sup.name} ({sup.code})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nhân viên phụ trách <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={staffName}
          readOnly
          className="w-full h-10 px-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 text-sm cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Ngày mua hàng <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={issueDate}
          disabled={isReadOnly}
          onChange={(e) => setIssueDate(e.target.value)}
          className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 text-sm"
        />
      </div>

      <div className="md:col-span-3">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Ghi chú</label>
        <textarea
          rows={2}
          value={note}
          disabled={isReadOnly}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Nhập ghi chú cho đơn hàng..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 text-sm"
        />
      </div>
    </div>
  )
}