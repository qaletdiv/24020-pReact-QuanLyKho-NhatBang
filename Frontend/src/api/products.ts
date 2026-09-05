import { apiClient } from './apiClient'
import type { ProductOption } from '../components/purchase-order/OrderDetailTable'

export const getProducts = async (keyword?: string): Promise<ProductOption[]> => {
  try {
    const response = await apiClient.get('product/products', {
      params: keyword ? { keyword } : {},
    })

    if (Array.isArray(response.data)) {
      return response.data as ProductOption[]
    }
    return (response.data?.products || response.data?.data || []) as ProductOption[]
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error)
    return []
  }
}