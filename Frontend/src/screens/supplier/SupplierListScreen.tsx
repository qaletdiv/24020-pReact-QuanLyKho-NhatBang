import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { Header } from "../../components/layout/Header";
import { Button } from "../../components/ui/Button";
import { SupplierSearchBar } from "../../components/supplier/SupplierSearchBar";
import { SupplierTable } from "../../components/supplier/SupplierTable";
import {
  getSuppliers,
  deleteSupplier,
  type SupplierItem,
} from "../../api/suppliers";

interface ApiErrorResponse {
  message?: string;
}

export const SupplierListScreen: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchKeyword, setSearchKeyword] = useState("");

  const {
    data: suppliers = [],
    isLoading,
    isError,
  } = useQuery<SupplierItem[]>({
    queryKey: ["suppliers", searchKeyword],
    queryFn: async (): Promise<SupplierItem[]> => {
      const res = await getSuppliers(searchKeyword);
      return (res || []) as SupplierItem[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteSupplier(id),
    onSuccess: () => {
      alert("Đã xóa nhà cung cấp thành công!");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      alert(err.response?.data?.message || "Lỗi khi xóa nhà cung cấp!");
    },
  });

  const handleDeleteSupplier = (id: number, name: string) => {
    if (
      window.confirm(
        `Bạn có chắc muốn xóa nhà cung cấp "${name}"? Thao tác này không thể hoàn tác.`,
      )
    ) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Danh sách Nhà cung cấp
          </h1>
          <div>
            <Button onClick={() => navigate("/suppliers/create")}>
              + Tạo mới nhà cung cấp
            </Button>
          </div>
        </div>

        <SupplierSearchBar
          value={searchKeyword}
          onChange={setSearchKeyword}
          totalCount={suppliers.length}
        />

        <SupplierTable
          suppliers={suppliers as SupplierItem[]}
          isLoading={isLoading}
          isError={isError}
          onRowClick={(id) => navigate(`/suppliers/${id}`)}
          onDeleteClick={handleDeleteSupplier}
        />
      </main>
    </div>
  );
};
