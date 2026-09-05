import React from 'react'
import type { ProductItem } from '../../screens/product/ProductListScreen'

interface ProductTableProps {
  products: ProductItem[]
  isLoading: boolean
  isError: boolean
  onRowClick: (id: number) => void
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  isLoading,
  isError,
  onRowClick,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="py-3.5 px-4">Mã SP</th>
              <th className="py-3.5 px-4">Tên sản phẩm</th>
              <th className="py-3.5 px-4">Quy cách / Size</th>
              <th className="py-3.5 px-4 text-right">Đơn giá tham khảo</th>
              <th className="py-3.5 px-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  Đang tải danh sách sản phẩm...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-red-500">
                  Không thể tải danh sách sản phẩm từ máy chủ.
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">
                  Chưa có sản phẩm nào trong hệ thống.
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onRowClick(item.id)}
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors duration-150"
                >
                  <td className="py-3.5 px-4 font-semibold text-blue-600">
                    {item.code}
                  </td>
                  <td className="py-3.5 px-4 text-gray-900 font-medium">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    {item.sizeName || '—'}
                  </td>
                  <td className="py-3.5 px-4 text-right font-semibold text-gray-800">
                    {item.price.toLocaleString('vi-VN')} đ
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="text-xs text-blue-600 hover:underline font-medium">
                      Xem / Sửa
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}