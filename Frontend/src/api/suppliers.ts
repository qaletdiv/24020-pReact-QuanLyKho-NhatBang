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
export interface PaginationMeta {
  totalItems: number
  totalPages: number
  currentPage: number
  limit: number
}

export interface SupplierApiResponse {
  data: SupplierItem[]
  pagination: PaginationMeta
}
export const getSuppliers = async (
  keyword?: string,
  page: number = 1,
  limit: number = 10
): Promise<SupplierApiResponse> => {
  const res = await apiClient.get('/supplier/suppliers', {
    params: {
      keyword: keyword || undefined,
      page,
      limit,
    },
  })

  const resData = res.data


  if (Array.isArray(resData)) {
    return {
      data: resData,
      pagination: {
        totalItems: resData.length,
        totalPages: 1,
        currentPage: 1,
        limit: resData.length || 10,
      },
    }
  }

  return {
    data: resData.data ?? resData.suppliers ?? [],
    pagination: resData.pagination ?? {
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
      limit: 10,
    },
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
  const res = await apiClient.patch(`/supplier/suppliers/${id}`, payload)
  return res.data
}

export const deleteSupplier = async (id: string | number) => {
  const res = await apiClient.delete(`/supplier/suppliers/${id}`)
  return res.data
}