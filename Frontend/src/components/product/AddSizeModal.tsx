import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { createProductSize, type ProductSizeOption } from '../../api/products'

interface AddSizeModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccessCreated: (newSize: ProductSizeOption) => void
}

export const AddSizeModal: React.FC<AddSizeModalProps> = ({
  isOpen,
  onClose,
  onSuccessCreated,
}) => {
  const [sizeName, setSizeName] = useState('')
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (name: string) => createProductSize(name),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['productSizes'] })
      onSuccessCreated(data)
      setSizeName('')
      onClose()
    },
    onError: (err: AxiosError<{ message?: string }>) => {
      alert(err.response?.data?.message || 'Có lỗi xảy ra khi thêm quy cách!')
    },
  })

  if (!isOpen) return null

  const handleSave = () => {
    if (!sizeName.trim()) {
      alert('Vui lòng nhập tên quy cách/kích cỡ!')
      return
    }
    createMutation.mutate(sizeName.trim())
  }

  // Cho phép bấm phím Enter trong ô input để lưu
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      handleSave()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-150">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Thêm quy cách mới</h3>
        <p className="text-sm text-gray-500 mb-4">
          Nhập tên dung tích hoặc đơn vị đóng gói (ví dụ: Lon 1L, Thùng 5L, Bao 20kg...)
        </p>

        {/* Đổi thẻ form thành div để tránh lỗi lồng form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên quy cách <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              autoFocus
              value={sizeName}
              onChange={(e) => setSizeName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="VD: Thùng 18L"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={createMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {createMutation.isPending ? 'Đang lưu...' : 'Lưu quy cách'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}