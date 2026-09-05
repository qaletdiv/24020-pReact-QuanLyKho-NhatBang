import { apiClient } from './apiClient'
import type { ProductItem } from '../screens/product/ProductListScreen'

// Thêm export cho interface này
export interface ProductSizeOption {
  id: number
  sizeName: string
}

export interface ProductPayload {
  name: string
  code: string
  price: number
  description?: string
  sizeId?: number | null
  imageUrl?: string
}

export const getProducts = async (keyword?: string): Promise<ProductItem[]> => {
  const res = await apiClient.get('/product/products', {
    params: keyword ? { keyword } : {},
  })
  return Array.isArray(res.data) ? res.data : res.data?.products || []
}

export const getProductById = async (id: string | number): Promise<ProductItem> => {
  const res = await apiClient.get(`/product/products/${id}`)
  return res.data
}

export const createProduct = async (payload: ProductPayload) => {
  const res = await apiClient.post('/product/products', payload)
  return res.data
}

export const updateProduct = async (id: string | number, payload: ProductPayload) => {
  const res = await apiClient.put(`/product/products/${id}`, payload)
  return res.data
}

export const getProductSizes = async (): Promise<ProductSizeOption[]> => {
  const res = await apiClient.get('/product/products/sizes')
  return Array.isArray(res.data) ? res.data : []
}
export const createProductSize = async (sizeName: string): Promise<ProductSizeOption> => {
  const res = await apiClient.post('/product/sizes', { sizeName })
  return res.data?.data || res.data
}