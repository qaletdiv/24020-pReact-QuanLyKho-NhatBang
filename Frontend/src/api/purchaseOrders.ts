import { apiClient } from './apiClient'


export interface PurchaseOrderItem {
  productId: number
  productCode?: string
  productName?: string
  quantity: number
  unitPrice: number
  subtotal?: number
}

export interface PurchaseOrder {
  id: string
  orderCode: string
  supplierId?: number
  supplierName: string
  purchaseDate: string
  createdByName: string
  totalAmount: number
  status: 'DRAFT' | 'CONFIRMED' | 'IMPORTED' | 'Draft' | 'Confirmed' | 'Imported'
  note?: string
  items?: PurchaseOrderItem[]
}

export interface OrderFilterParams {
  orderCode?: string
  supplierName?: string
}

export interface OrderItemPayload {
  productId: number
  quantity: number
  unitPrice: number
}

export interface CreateOrderPayload {
  supplierId: number
  note?: string
  issueDate?: string
  items: OrderItemPayload[]
}

interface PurchaseOrderListResponse {
  orders?: PurchaseOrder[]
  data?: PurchaseOrder[]
}

interface PurchaseOrderDetailResponse {
  order?: PurchaseOrder
  data?: PurchaseOrder
}


export const getPurchaseOrders = async (params?: OrderFilterParams): Promise<PurchaseOrder[]> => {
  const response = await apiClient.get<PurchaseOrder[] | PurchaseOrderListResponse>('/purchase/purchase-orders', { params })
  if (Array.isArray(response.data)) {
    return response.data
  }
  return response.data.orders || response.data.data || []
}


export const getPurchaseOrderById = async (id: number | string): Promise<PurchaseOrder> => {
  const response = await apiClient.get<PurchaseOrder | PurchaseOrderDetailResponse>(`/purchase/purchase-orders/${id}`)
  if ('order' in response.data && response.data.order) {
    return response.data.order
  }
  if ('data' in response.data && response.data.data) {
    return response.data.data
  }
  return response.data as PurchaseOrder
}


export const createPurchaseOrder = async (payload: CreateOrderPayload) => {
  const response = await apiClient.post('/purchase/purchase-orders', payload)
  return response.data
}


export const updatePurchaseOrder = async (id: number | string, payload: CreateOrderPayload) => {
  const response = await apiClient.put(`/purchase/purchase-orders/${id}`, payload)
  return response.data
}

export const confirmPurchaseOrder = async (id: number | string) => {
  const response = await apiClient.patch(`/purchase/purchase-orders/${id}/confirm`)
  return response.data
}


export const importPurchaseOrder = async (id: number | string) => {
  const response = await apiClient.patch(`/purchase/purchase-orders/${id}/import`)
  return response.data
}