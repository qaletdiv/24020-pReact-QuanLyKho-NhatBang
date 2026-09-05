import { apiClient } from './apiClient'

export interface SupplierItem {
  id: number
  code: string
  name: string
  phone?: string | null
  email?: string | null
  address?: string | null
  note?: string | null
}

export interface SupplierPayload {
  name: string
  code?: string
  phone?: string
  email?: string
  address?: string
  note?: string
}

export const getSuppliers = async (keyword?: string): Promise<SupplierItem[]> => {
  try {
    const res = await apiClient.get('/supplier/suppliers', {
      params: keyword ? { keyword } : {},
    })
    return Array.isArray(res.data) ? res.data : res.data?.suppliers || []
  } catch (error) {
    console.error('Lỗi khi lấy danh sách nhà cung cấp:', error)
    return []
  }
}

export const getSupplierById = async (id: string | number): Promise<SupplierItem> => {
  const res = await apiClient.get(`/supplier/suppliers/${id}`)
  return res.data
}

export const createSupplier = async (payload: SupplierPayload) => {
  const res = await apiClient.post('/supplier/suppliers', payload)
  return res.data
}

export const updateSupplier = async (id: string | number, payload: SupplierPayload) => {
  const res = await apiClient.put(`/supplier/suppliers/${id}`, payload)
  return res.data
}

export const deleteSupplier = async (id: string | number) => {
  const res = await apiClient.delete(`/supplier/suppliers/${id}`)
  return res.data
}