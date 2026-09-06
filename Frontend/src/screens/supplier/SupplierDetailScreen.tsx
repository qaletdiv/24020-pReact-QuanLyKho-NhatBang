import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { Header } from '../../components/layout/Header'
import { Button } from '../../components/ui/Button'
import { SupplierDetailForm, type SupplierFormData } from '../../components/supplier/SupplierDetailForm'
import { getSupplierById, createSupplier, updateSupplier, deleteSupplier } from '../../api/suppliers'

interface ApiErrorResponse {
  message?: string
}

interface SupplierFormViewProps {
  id?: string
  isEditMode: boolean
  defaultData: SupplierFormData
}

const SupplierFormView: React.FC<SupplierFormViewProps> = ({
  id,
  isEditMode,
  defaultData,
}) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<SupplierFormData>(defaultData)

  const handleFieldChange = <K extends keyof SupplierFormData>(
    field: K,
    value: SupplierFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase() || undefined,
        phone: formData.phone.trim() || undefined,
        email: formData.email.trim() || undefined,
        address: formData.address.trim() || undefined,
        note: formData.note.trim() || undefined,
      }
      return isEditMode
        ? await updateSupplier(id!, payload)
        : await createSupplier(payload)
    },
    onSuccess: () => {
      alert(isEditMode ? 'Cập nhật nhà cung cấp thành công!' : 'Tạo mới nhà cung cấp thành công!')
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
      navigate('/suppliers')
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      alert(err.response?.data?.message || 'Có lỗi xảy ra khi lưu nhà cung cấp!')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteSupplier(id!),
    onSuccess: () => {
      alert('Đã xóa nhà cung cấp thành công!')
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
      navigate('/suppliers')
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      alert(err.response?.data?.message || 'Có lỗi xảy ra khi xóa nhà cung cấp!')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return alert('Vui lòng nhập tên nhà cung cấp!')
    if (isEditMode && !formData.code.trim()) return alert('Vui lòng nhập mã nhà cung cấp!')
    saveMutation.mutate()
  }

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhà cung cấp này không?')) {
      deleteMutation.mutate()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-gray-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? `Chỉnh sửa: ${formData.name || `#${id}`}` : 'Tạo mới Nhà cung cấp'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEditMode
              ? 'Xem và cập nhật thông tin liên hệ, địa chỉ của nhà cung cấp'
              : 'Điền thông tin đối tác cung cấp hàng hóa mới'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isEditMode && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              {deleteMutation.isPending ? 'Đang xóa...' : 'Xóa NCC'}
            </button>
          )}

          {/* Thay thế bằng thẻ button outline tiêu chuẩn */}
          <button
            type="button"
            onClick={() => navigate('/suppliers')}
            className="whitespace-nowrap px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Quay lại
          </button>

          <Button type="submit" disabled={saveMutation.isPending}>
            {saveMutation.isPending ? 'Đang lưu...' : isEditMode ? 'Cập nhật' : 'Tạo nhà cung cấp'}
          </Button>
        </div>
      </div>

      <SupplierDetailForm
        formData={formData}
        onChange={handleFieldChange}
        isEditMode={isEditMode}
      />
    </form>
  )
}

export const SupplierDetailScreen: React.FC = () => {
  const { id } = useParams<{ id?: string }>()
  const isEditMode = Boolean(id && id !== 'create')

  const { data: supplierDetail, isLoading } = useQuery({
    queryKey: ['supplier', id],
    queryFn: () => getSupplierById(id!),
    enabled: isEditMode,
  })

  if (isEditMode && isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto py-16 text-center text-gray-500">
          Đang tải thông tin nhà cung cấp...
        </div>
      </div>
    )
  }

  const defaultData: SupplierFormData = isEditMode && supplierDetail
    ? {
        name: supplierDetail.name || '',
        code: supplierDetail.code || '',
        phone: supplierDetail.phone || '',
        email: supplierDetail.email || '',
        address: supplierDetail.address || '',
        note: supplierDetail.note || '',
      }
    : {
        name: '',
        code: '',
        phone: '',
        email: '',
        address: '',
        note: '',
      }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SupplierFormView
          key={id || 'new'}
          id={id}
          isEditMode={isEditMode}
          defaultData={defaultData}
        />
      </main>
    </div>
  )
}