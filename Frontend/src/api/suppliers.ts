import { apiClient } from './apiClient'

export const getSuppliers = async () => {
  try {
    const response = await apiClient.get('/supplier/suppliers')
    

    if (Array.isArray(response.data)) {
      return response.data
    }
    return response.data?.suppliers || response.data?.data || []
  } catch (error) {
    console.error('Lỗi khi lấy danh sách NCC:', error)
    return []
  }
}