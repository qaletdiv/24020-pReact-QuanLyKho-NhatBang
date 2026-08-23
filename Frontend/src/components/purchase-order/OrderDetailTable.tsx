import React from 'react'
export interface ProductOption {
  id: number
  code: string
  name: string
  price: number
}
export interface OrderRowItem {
  productId: number
  productCode: string
  productName: string
  quantity: number
  unitPrice: number
  subtotal: number
}

interface OrderDetailTableProps {
  items: OrderRowItem[]
  products: ProductOption[]
  isReadOnly: boolean
  onAddItem: () => void
  onRemoveItem: (index: number) => void
  onItemChange: (index: number, field: keyof OrderRowItem, value: string | number) => void
}

export const OrderDetailTable: React.FC<OrderDetailTableProps> = ({
  items,
  products,
  isReadOnly,
  onAddItem,
  onRemoveItem,
  onItemChange,
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Chi tiết sản phẩm</h2>
        {!isReadOnly && (
          <button
            type="button"
            onClick={onAddItem}
            className="px-3.5 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-100 transition"
          >
            + Thêm sản phẩm
          </button>
        )}
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
            <tr>
              <th className="px-4 py-3 text-left w-52">Mã sản phẩm</th>
              <th className="px-4 py-3 text-left">Tên sản phẩm</th>
              <th className="px-4 py-3 text-right w-32">Số lượng</th>
              <th className="px-4 py-3 text-right w-40">Đơn giá (đ)</th>
              <th className="px-4 py-3 text-right w-44">Thành tiền (đ)</th>
              {!isReadOnly && <th className="px-4 py-3 text-center w-16">Xóa</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  Chưa có sản phẩm nào. Nhấn "+ Thêm sản phẩm" để chọn mặt hàng.
                </td>
              </tr>
            ) : (
              items.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5">
                    {isReadOnly ? (
                      <span className="font-semibold text-gray-800">{row.productCode}</span>
                    ) : (
                      <select
                        value={row.productId}
                        onChange={(e) => onItemChange(idx, 'productId', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500"
                      >
                        <option value={0}>-- Chọn SP --</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.code} - {p.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>

                  <td className="px-4 py-2.5 text-gray-800 font-medium">
                    {row.productName || '-'}
                  </td>

                  <td className="px-4 py-2.5 text-right">
                    {isReadOnly ? (
                      <span className="font-semibold">{row.quantity}</span>
                    ) : (
                      <input
                        type="number"
                        min="1"
                        value={row.quantity}
                        onChange={(e) => onItemChange(idx, 'quantity', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-right text-sm focus:ring-1 focus:ring-blue-500"
                      />
                    )}
                  </td>

                  <td className="px-4 py-2.5 text-right">
                    {isReadOnly ? (
                      <span>{row.unitPrice.toLocaleString('vi-VN')}</span>
                    ) : (
                      <input
                        type="number"
                        min="0"
                        value={row.unitPrice}
                        onChange={(e) => onItemChange(idx, 'unitPrice', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-right text-sm focus:ring-1 focus:ring-blue-500"
                      />
                    )}
                  </td>

                  <td className="px-4 py-2.5 text-right font-bold text-gray-900">
                    {row.subtotal.toLocaleString('vi-VN')} đ
                  </td>

                  {!isReadOnly && (
                    <td className="px-4 py-2.5 text-center">
                      <button
                        type="button"
                        onClick={() => onRemoveItem(idx)}
                        className="text-red-500 hover:text-red-700 font-bold p-1 rounded"
                      >
                        ✕
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}