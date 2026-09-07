import React from "react";
import { Button } from "../ui/Button";

interface InventorySearchBarProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  isLoading?: boolean;
}

export const InventorySearchBar: React.FC<InventorySearchBarProps> = ({
  searchTerm,
  onSearchTermChange,
  onSubmit,
  onReset,
  isLoading,
}) => {
 return (
  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
    <form onSubmit={onSubmit} className="w-full flex items-center gap-3">
      <div className="relative flex-1 min-w-0">
        <input
          type="text"
          placeholder="Nhập Mã hoặc Tên sản phẩm..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={onReset}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm font-semibold p-1"
          >
            ✕
          </button>
        )}
      </div>

      <div className="shrink-0">
        <Button 
          type="submit" 
          isLoading={isLoading} 
          className="!w-32 justify-center px-4 py-2"
        >
          Tìm kiếm
        </Button>
      </div>
    </form>
  </div>
);
};
