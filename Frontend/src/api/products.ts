import { apiClient } from './apiClient'

export const getProducts = async () => {
  try {
    const response = await apiClient.get('product/products')
    
    if (Array.isArray(response.data)) {
      return response.data
    }
    return response.data?.products || response.data?.data || []
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error)
    return []
  }
}