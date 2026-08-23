import './App.css'
import 'antd/dist/reset.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginScreen } from './screens/login/LoginScreen'
import {PurchaseOrderListScreen} from './screens/purchase-orders/PurchaseOrderListScreen'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { PurchaseOrderDetailScreen } from './screens/purchase-orders/PurchaseOrderDetailScreen'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<LoginScreen />} />
        {/* <Route path="/purchase-orders" element={<PurchaseOrderListScreen />} /> */}
        <Route element={<ProtectedRoute />}>
          {/* <Route path="/" element={<Navigate to="/purchase-orders" replace />} /> */}
          <Route path="/" element={<Navigate to="/purchase-orders" replace />} />
          <Route path="/purchase-orders" element={<PurchaseOrderListScreen />} />
          <Route path="/purchase-orders/create" element={<PurchaseOrderDetailScreen />} />
          <Route path="/purchase-orders/:id" element={<PurchaseOrderDetailScreen />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App