import { apiClient } from './apiClient';

export interface InventoryItem {
    id: number;
    code: string;
    name: string;
    stock: number;
    sizeName?: string | null;
}

export interface InventoryCheckResponse {
    data: InventoryItem[];
    pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}

export const checkInventory = async (
    keyword: string,
    page = 1,
    limit = 10
): Promise<InventoryCheckResponse> => {
    const response = await apiClient.get<InventoryCheckResponse>('/inventory/check', {
        params: { keyword: keyword || undefined, page, limit },
    });

    return response.data;
};