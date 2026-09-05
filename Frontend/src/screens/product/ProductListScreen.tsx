import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Header } from "../../components/layout/Header";
import { Button } from "../../components/ui/Button";
import { ProductSearchBar } from "../../components/product/ProductSearchBar";
import { ProductTable } from "../../components/product/ProductTable";

import { getProducts } from "../../api/products";

export interface ProductItem {
  id: number;
  code: string;
  name: string;
  price: number;
  sizeName: string | null;
  description?: string;
  imageUrl?: string;
}

export const ProductListScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery<ProductItem[]>({
    queryKey: ["products", searchKeyword],
    queryFn: async (): Promise<ProductItem[]> => {
      const res = await getProducts(searchKeyword);
      return (res || []) as ProductItem[];
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Danh sách Sản phẩm
          </h1>
          <div>
            <Button onClick={() => navigate("/products/create")}>
              + Tạo mới sản phẩm
            </Button>
          </div>
        </div>

        <ProductSearchBar
          value={searchKeyword}
          onChange={setSearchKeyword}
          totalCount={products.length}
        />

        <ProductTable
          products={products as ProductItem[]}
          isLoading={isLoading}
          isError={isError}
          onRowClick={(id) => navigate(`/products/${id}`)}
        />
      </main>
    </div>
  );
};
