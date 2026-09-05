import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { Header } from '../../components/layout/Header'
import { Button } from '../../components/ui/Button'
import { ProductDetailForm, type ProductFormData } from '../../components/product/ProductDetailForm'

import {
  getProductById,
  createProduct,
  updateProduct,
  getProductSizes,
  type ProductSizeOption,
} from '../../api/products'

interface ApiErrorResponse {
  message?: string
}

interface ProductFormViewProps {
  id?: string
  isEditMode: boolean
  defaultData: ProductFormData
  sizes: ProductSizeOption[]
}

const ProductFormView: React.FC<ProductFormViewProps> = ({
  id,
  isEditMode,
  defaultData,
  sizes,
}) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<ProductFormData>(defaultData)

  const handleFieldChange = <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase(),
        price: Number(formData.price) || 0,
        description: formData.description.trim() || undefined,
        sizeId: formData.sizeId ? Number(formData.sizeId) : null,
        imageUrl: formData.imageUrl.trim() || undefined,
      }
      return isEditMode
        ? await updateProduct(id!, payload)
        : await createProduct(payload)
    },
    onSuccess: () => {
      alert(isEditMode ? 'Cập nhật sản phẩm thành công!' : 'Tạo mới sản phẩm thành công!')
      queryClient.invalidateQueries({ queryKey: ['products'] })
      navigate('/products')
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      alert(err.response?.data?.message || 'Có lỗi xảy ra khi lưu sản phẩm!')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return alert('Vui lòng nhập tên sản phẩm!')
    if (!formData.code.trim()) return alert('Vui lòng nhập mã sản phẩm!')
    saveMutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-gray-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? `Chỉnh sửa: ${formData.name || `#${id}`}` : 'Tạo mới Sản phẩm'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEditMode
              ? 'Cập nhật thông tin quy cách, đơn giá và mô tả sản phẩm'
              : 'Điền các thông tin để khai báo sản phẩm mới vào danh mục'}
          </p>
        </div>

        <div className="flex items-center gap-3">
       
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Quay lại
          </button>
          
          <Button type="submit" disabled={saveMutation.isPending}>
            {saveMutation.isPending ? 'Đang lưu...' : isEditMode ? 'Cập nhật' : 'Tạo sản phẩm'}
          </Button>
        </div>
      </div>

      <ProductDetailForm
        formData={formData}
        onChange={handleFieldChange}
        sizes={sizes}
        isEditMode={isEditMode}
      />
    </form>
  )
}

export const ProductDetailScreen: React.FC = () => {
  const { id } = useParams<{ id?: string }>()
  const isEditMode = Boolean(id && id !== 'create')


  const { data: sizes = [] } = useQuery<ProductSizeOption[]>({
    queryKey: ['productSizes'],
    queryFn: async (): Promise<ProductSizeOption[]> => {
      const res = await getProductSizes()
      return (res || []) as ProductSizeOption[]
    },
  })

  const { data: productDetail, isLoading: isLoadingDetail } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id!),
    enabled: isEditMode,
  })

  if (isEditMode && isLoadingDetail) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto py-16 text-center text-gray-500">
          Đang tải thông tin sản phẩm...
        </div>
      </div>
    )
  }

  const defaultData: ProductFormData = isEditMode && productDetail
    ? {
        name: productDetail.name || '',
        code: productDetail.code || '',
        price: Number(productDetail.price) || 0,
        description: productDetail.description || '',
        sizeId: productDetail.sizeId ?? '',
        imageUrl: productDetail.imageUrl || '',
      }
    : {
        name: '',
        code: '',
        price: 0,
        description: '',
        sizeId: '',
        imageUrl: '',
      }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductFormView
          key={id || 'new'}
          id={id}
          isEditMode={isEditMode}
          defaultData={defaultData}
          sizes={sizes as ProductSizeOption[]}
        />
      </main>
    </div>
  )
}