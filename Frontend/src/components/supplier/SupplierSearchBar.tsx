import React from 'react'

interface SupplierSearchBarProps {
  value: string
  onChange: (val: string) => void
  totalCount: number
}

export const SupplierSearchBar: React.FC<SupplierSearchBarProps> = ({
  value,
  onChange,
  totalCount,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <input
        type="text"
        placeholder="Tìm kiếm theo mã, tên hoặc số điện thoại..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-xs text-gray-500 font-medium">
        Tổng cộng: <strong className="text-gray-800">{totalCount}</strong> nhà cung cấp
      </span>
    </div>
  )
}