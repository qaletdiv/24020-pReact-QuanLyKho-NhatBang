import React from 'react';
import { type InventoryItem } from '../../api/inventory';

interface InventoryTableProps {
  items: InventoryItem[];
  isLoading: boolean;
  isError: boolean;
  activeKeyword: string;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  items,
  isLoading,
  isError,
  activeKeyword,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200 uppercase text-xs">
            <tr>
              <th className="px-6 py-3.5">Mã sản phẩm</th>
              <th className="px-6 py-3.5">Tên sản phẩm</th>
              <th className="px-6 py-3.5">Quy cách</th>
              <th className="px-6 py-3.5 text-right">Số lượng tồn kho</th>
              <th className="px-6 py-3.5 text-center">Tình trạng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  Đang tra cứu dữ liệu tồn kho...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-red-500">
                  Có lỗi xảy ra khi truy vấn dữ liệu tồn kho!
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  {activeKeyword
                    ? `Không tìm thấy sản phẩm nào khớp với từ khóa "${activeKeyword}"`
                    : 'Chưa có dữ liệu tồn kho'}
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const stockQuantity = Number(item.stock ?? 0);
                const isOutOfStock = stockQuantity <= 0;
                const isLowStock = stockQuantity > 0 && stockQuantity <= 5;

                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-blue-600">
                      {item.code}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {item.sizeName || '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`font-bold text-base ${
                          isOutOfStock
                            ? 'text-red-600'
                            : isLowStock
                            ? 'text-yellow-600'
                            : 'text-gray-900'
                        }`}
                      >
                        {stockQuantity.toLocaleString('vi-VN')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {isOutOfStock ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                          Hết hàng
                        </span>
                      ) : isLowStock ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                          Sắp hết
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          Còn hàng
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};