import React from 'react'

interface ProductSearchBarProps {
  value: string
  onChange: (val: string) => void
  totalCount: number
}

export const ProductSearchBar: React.FC<ProductSearchBarProps> = ({
  value,
  onChange,
  totalCount,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 shadow-sm flex items-center justify-between">
      <input
        type="text"
        placeholder="Tìm kiếm theo mã hoặc tên sản phẩm..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-xs text-gray-500 font-medium ml-4">
        Tổng cộng: <strong className="text-gray-800">{totalCount}</strong> sản phẩm
      </span>
    </div>
  )
}