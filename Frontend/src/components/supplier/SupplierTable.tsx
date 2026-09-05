import React from 'react'
import type { SupplierItem } from '../../api/suppliers'

interface SupplierTableProps {
  suppliers: SupplierItem[]
  isLoading: boolean
  isError: boolean
  onRowClick: (id: number) => void
  onDeleteClick: (id: number, name: string) => void
}

export const SupplierTable: React.FC<SupplierTableProps> = ({
  suppliers,
  isLoading,
  isError,
  onRowClick,
  onDeleteClick,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="py-3.5 px-4">Mã NCC</th>
              <th className="py-3.5 px-4">Tên nhà cung cấp</th>
              <th className="py-3.5 px-4">Số điện thoại</th>
              <th className="py-3.5 px-4">Email</th>
              <th className="py-3.5 px-4">Địa chỉ</th>
              <th className="py-3.5 px-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  Đang tải danh sách nhà cung cấp...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-red-500">
                  Không thể tải dữ liệu từ máy chủ.
                </td>
              </tr>
            ) : suppliers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400">
                  Chưa có nhà cung cấp nào.
                </td>
              </tr>
            ) : (
              suppliers.map((item) => (
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
                    {item.phone || '—'}
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    {item.email || '—'}
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 max-w-xs truncate">
                    {item.address || '—'}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onRowClick(item.id)
                        }}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Sửa
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteClick(item.id, item.name)
                        }}
                        className="text-xs text-red-600 hover:text-red-800 font-semibold"
                      >
                        Xóa
                      </button>
                    </div>
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