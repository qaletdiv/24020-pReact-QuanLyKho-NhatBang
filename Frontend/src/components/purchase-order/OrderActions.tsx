import React from 'react'
import { Button } from '../ui/Button'

interface OrderActionsProps {
    isEditMode: boolean
    status: string
    isSaving: boolean
    isConfirming: boolean
    isImporting: boolean
    onBack: () => void
    onSave: () => void
    onConfirm: () => void
    onImport: () => void
}

export const OrderActions: React.FC<OrderActionsProps> = ({
    isEditMode,
    status,
    isSaving,
    isConfirming,
    isImporting,
    onBack,
    onSave,
    onConfirm,
    onImport,
}) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
            <button
                type="button"
                onClick={onBack}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
            >
                ← Quay về danh sách
            </button>

            <div className="flex flex-wrap gap-3">
                {(!isEditMode || status === 'Draft') && (
                    <Button type="button" onClick={onSave} isLoading={isSaving}>
                        Lưu lại
                    </Button>
                )}

                {isEditMode && status === 'Draft' && (
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isConfirming}
                        className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition shadow-sm"
                    >
                        {isConfirming ? 'Đang xác nhận...' : 'Xác nhận đơn hàng'}
                    </button>
                )}

                {isEditMode && status === 'Confirmed' && (
                    <button
                        type="button"
                        onClick={onImport}
                        disabled={isImporting}
                        className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition shadow-sm"
                    >
                        {isImporting ? 'Đang nhập kho...' : 'Xác nhận nhập kho'}
                    </button>
                )}
            </div>
        </div>
    )
}