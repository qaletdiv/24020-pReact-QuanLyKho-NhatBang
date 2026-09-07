import './App.css'
import 'antd/dist/reset.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginScreen } from './screens/login/LoginScreen'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { PurchaseOrderListScreen } from './screens/purchase-orders/PurchaseOrderListScreen'
import { PurchaseOrderDetailScreen } from './screens/purchase-orders/PurchaseOrderDetailScreen'
import { ProductListScreen } from './screens/product/ProductListScreen'
import { ProductDetailScreen } from './screens/product/ProductDetailScreen' 
import { SupplierListScreen } from './screens/supplier/SupplierListScreen'
import { SupplierDetailScreen } from './screens/supplier/SupplierDetailScreen'
import { InventoryCheckScreen } from './screens/inventory/InventoryCheckScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/purchase-orders" replace />} />

    
          <Route path="/purchase-orders" element={<PurchaseOrderListScreen />} />
          <Route path="/purchase-orders/create" element={<PurchaseOrderDetailScreen />} />
          <Route path="/purchase-orders/:id" element={<PurchaseOrderDetailScreen />} />

      
          <Route path="/products" element={<ProductListScreen />} />
          <Route path="/products/create" element={<ProductDetailScreen />} /> {/* <-- Thêm route này */}
          <Route path="/products/:id" element={<ProductDetailScreen />} />     {/* <-- Thêm route này */}

     
          <Route path="/suppliers" element={<SupplierListScreen />} />
          <Route path="/suppliers/create" element={<SupplierDetailScreen />} />
          <Route path="/suppliers/:id" element={<SupplierDetailScreen />} />
          <Route path="/inventory" element={<InventoryCheckScreen/>}/>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App