import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import type { AxiosError } from 'axios'

import { Header } from '../../components/layout/Header'
import { OrderInfoForm, type SupplierOption } from '../../components/purchase-order/OrderInfoForm'
import { OrderDetailTable, type OrderRowItem, type ProductOption } from '../../components/purchase-order/OrderDetailTable'
import { OrderActions } from '../../components/purchase-order/OrderActions'

import { getSuppliers } from '../../api/suppliers'
import { getProducts } from '../../api/products'
import {
  getPurchaseOrderById,
  createPurchaseOrder,
  updatePurchaseOrder,
  confirmPurchaseOrder,
  importPurchaseOrder,
} from '../../api/purchaseOrders'

interface RootState {
  auth?: {
    user?: {
      id?: number
      username?: string
      email?: string
      role?: string
    }
  }
}

interface ApiErrorResponse {
  message?: string
}

interface OrderFormData {
  supplierId: number | ''
  staffName: string
  issueDate: string
  note: string
  status: string
  items: OrderRowItem[]
}

// COMPONENT FORM CON (State được khởi tạo trực tiếp từ defaultData, không cần useEffect)
interface FormViewProps {
  id?: string
  isEditMode: boolean
  defaultData: OrderFormData
  suppliers: SupplierOption[]
  products: ProductOption[]
  orderCode?: string
}

const FormView: React.FC<FormViewProps> = ({
  id,
  isEditMode,
  defaultData,
  suppliers,
  products,
  orderCode,
}) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // State khởi tạo ngay lập tức, không gây cascading renders
  const [formData, setFormData] = useState<OrderFormData>(defaultData)
  const isReadOnly = isEditMode && formData.status !== 'Draft'

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { productId: 0, productCode: '', productName: '', quantity: 1, unitPrice: 0, subtotal: 0 },
      ],
    }))
  }

  const handleRemoveItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }))
  }

  const handleItemChange = (
    index: number,
    field: keyof OrderRowItem,
    value: string | number
  ) => {
    setFormData((prev) => {
      const updatedItems = [...prev.items]
      if (field === 'productId') {
        const selected = products.find((p) => p.id === Number(value))
        if (selected) {
          updatedItems[index].productId = selected.id
          updatedItems[index].productCode = selected.code
          updatedItems[index].productName = selected.name
          updatedItems[index].unitPrice = Number(selected.price) || 0
          updatedItems[index].subtotal = updatedItems[index].quantity * (Number(selected.price) || 0)
        }
      } else if (field === 'quantity' || field === 'unitPrice') {
        const numVal = Math.max(0, Number(value) || 0)
        updatedItems[index][field] = numVal
        updatedItems[index].subtotal = updatedItems[index].quantity * updatedItems[index].unitPrice
      }
      return { ...prev, items: updatedItems }
    })
  }

  const totalAmount = formData.items.reduce((sum, item) => sum + (item.subtotal || 0), 0)

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        supplierId: Number(formData.supplierId),
        note: formData.note,
        issueDate: formData.issueDate,
        items: formData.items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        })),
      }
      return isEditMode ? await updatePurchaseOrder(id!, payload) : await createPurchaseOrder(payload)
    },
    onSuccess: (data) => {
      alert(isEditMode ? 'Cập nhật thành công!' : 'Tạo mới đơn hàng bản nháp thành công!')
      queryClient.invalidateQueries({ queryKey: ['purchaseOrders'] })
      navigate(`/purchase-orders/${isEditMode ? id : data?.order?.id || data?.orderId}`)
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      alert(err.response?.data?.message || 'Có lỗi khi lưu đơn hàng!')
    },
  })

  const confirmMutation = useMutation({
    mutationFn: () => confirmPurchaseOrder(id!),
    onSuccess: () => {
      alert('Đã xác nhận đơn hàng!')
      setFormData((prev) => ({ ...prev, status: 'Confirmed' }))
      queryClient.invalidateQueries({ queryKey: ['purchaseOrder', id] })
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      alert(err.response?.data?.message || 'Lỗi khi xác nhận đơn hàng!')
    },
  })

  const importMutation = useMutation({
    mutationFn: () => importPurchaseOrder(id!),
    onSuccess: () => {
      alert('Nhập kho thành công và đã cộng tồn kho!')
      setFormData((prev) => ({ ...prev, status: 'Imported' }))
      queryClient.invalidateQueries({ queryKey: ['purchaseOrder', id] })
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      alert(err.response?.data?.message || 'Lỗi khi nhập kho!')
    },
  })

  const handleSave = () => {
    if (!formData.supplierId) return alert('Vui lòng chọn Nhà cung cấp!')
    if (formData.items.length === 0 || formData.items.some((i) => !i.productId || i.quantity <= 0)) {
      return alert('Vui lòng chọn sản phẩm và nhập số lượng hợp lệ!')
    }
    saveMutation.mutate()
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">

      <div className="flex justify-between items-center pb-6 mb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? `Đơn mua hàng: ${orderCode || `#${id}`}` : 'Tạo mới Đơn mua hàng'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEditMode ? 'Xem chi tiết và cập nhật trạng thái đơn hàng' : 'Nhập thông tin nhà cung cấp và danh sách mặt hàng nhập'}
          </p>
        </div>

        {isEditMode && (
          <span
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
              formData.status === 'Draft'
                ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                : formData.status === 'Confirmed'
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'bg-green-100 text-green-800 border border-green-200'
            }`}
          >
            {formData.status === 'Draft' ? 'Bản nháp' : formData.status === 'Confirmed' ? 'Đã xác nhận' : 'Đã nhập kho'}
          </span>
        )}
      </div>

      <OrderInfoForm
        supplierId={formData.supplierId}
        setSupplierId={(supId) => setFormData((prev) => ({ ...prev, supplierId: supId }))}
        staffName={formData.staffName}
        issueDate={formData.issueDate}
        setIssueDate={(date) => setFormData((prev) => ({ ...prev, issueDate: date }))}
        note={formData.note}
        setNote={(noteText) => setFormData((prev) => ({ ...prev, note: noteText }))}
        suppliers={suppliers}
        isReadOnly={isReadOnly}
      />

      <OrderDetailTable
        items={formData.items}
        products={products}
        isReadOnly={isReadOnly}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onItemChange={handleItemChange}
      />

      <div className="flex justify-end p-4 bg-gray-50 rounded-xl border border-gray-200 mb-8">
        <div className="flex items-center gap-6">
          <span className="text-gray-600 font-semibold">Tổng tiền đơn hàng:</span>
          <span className="text-2xl font-black text-blue-600">
            {totalAmount.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </div>

      <OrderActions
        isEditMode={isEditMode}
        status={formData.status}
        isSaving={saveMutation.isPending}
        isConfirming={confirmMutation.isPending}
        isImporting={importMutation.isPending}
        onBack={() => navigate('/purchase-orders')}
        onSave={handleSave}
        onConfirm={() => {
          if (window.confirm('Xác nhận đơn hàng? Sau khi xác nhận sẽ khóa sửa đổi.')) confirmMutation.mutate()
        }}
        onImport={() => {
          if (window.confirm('Xác nhận nhập kho và cộng tồn kho?')) importMutation.mutate()
        }}
      />
    </div>
  )
}

export const PurchaseOrderDetailScreen: React.FC = () => {
  const { id } = useParams<{ id?: string }>()
  const isEditMode = Boolean(id && id !== 'create')
  const currentUser = useSelector((state: RootState) => state.auth?.user)

  const { data: suppliers = [] } = useQuery<SupplierOption[]>({
    queryKey: ['suppliers'],
    queryFn: getSuppliers,
  })

  const { data: products = [] } = useQuery<ProductOption[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  const { data: orderDetail, isLoading: isLoadingDetail } = useQuery({
    queryKey: ['purchaseOrder', id],
    queryFn: () => getPurchaseOrderById(id!),
    enabled: isEditMode,
  })

  if (isEditMode && isLoadingDetail) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto py-12 text-center text-gray-500">Đang tải thông tin đơn hàng...</div>
      </div>
    )
  }

  const defaultData: OrderFormData = isEditMode && orderDetail
    ? {
        supplierId: orderDetail.supplierId ?? '',
        staffName: orderDetail.createdByName || '',
        issueDate: orderDetail.purchaseDate ? orderDetail.purchaseDate.split('T')[0] : '',
        note: orderDetail.note || '',
        status: orderDetail.status || 'Draft',
        items: (orderDetail.items as OrderRowItem[]) || [],
      }
    : {
        supplierId: '',
        staffName: currentUser?.username || 'Nhân viên',
        issueDate: new Date().toISOString().split('T')[0],
        note: '',
        status: 'Draft',
        items: [],
      }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FormView
          key={id || 'new'}
          id={id}
          isEditMode={isEditMode}
          defaultData={defaultData}
          suppliers={suppliers}
          products={products}
          orderCode={orderDetail?.orderCode}
        />
      </main>
    </div>
  )
}