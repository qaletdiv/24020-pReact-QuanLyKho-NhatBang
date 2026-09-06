import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  getPurchaseOrders,
  type OrderFilterParams,
  type PurchaseOrderListResponse,
} from '../../api/purchaseOrders'

import { Header } from '../../components/layout/Header'
import { OrderFilterForm } from '../../components/purchase-order/OrderFilterForm'
import { Button } from '../../components/ui/Button'
import { OrderTable } from '../../components/purchase-order/OrderTable'
import { Pagination } from '../../components/ui/Pagination'

export const PurchaseOrderListScreen: React.FC = () => {
  const navigate = useNavigate()
  const [appliedFilter, setAppliedFilter] = useState<OrderFilterParams>({})
  const [page, setPage] = useState(1)
  const limit = 10

  // Khi tìm kiếm hoặc lọc mới -> tự động đưa về trang 1
  const handleSearch = (filter: OrderFilterParams) => {
    setAppliedFilter(filter)
    setPage(1)
  }

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<PurchaseOrderListResponse>({
    queryKey: ['purchaseOrders', appliedFilter, page],
    queryFn: () => getPurchaseOrders({ ...appliedFilter, page, limit }),
    placeholderData: (prev) => prev,
  })

  // Bóc tách mảng danh sách an toàn
  const orders = response?.data || []
  const pagination = response?.pagination || {
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    limit,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Danh sách Đơn mua hàng</h1>
          <div className="max-w-5xl">
            <Button onClick={() => navigate('/purchase-orders/create')}>
              + Tạo mới
            </Button>
          </div>
        </div>

        <OrderFilterForm onSearch={handleSearch} isLoading={isLoading} />

        {/* Truyền đúng mảng orders vào component bảng */}
        <OrderTable orders={orders} isLoading={isLoading} isError={isError} />

        {/* Thanh điều hướng phân trang */}
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          limit={pagination.limit}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </main>
    </div>
  )
}