import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import { logout } from '../../store/slices/authSlice'

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-4 pt-4 text-sm transition-colors'
      : 'text-gray-500 hover:text-gray-700 pb-4 pt-4 text-sm font-medium border-b-2 border-transparent transition-colors'

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <nav className="flex space-x-8">
            <NavLink to="/purchase-orders" className={getNavClass}>
              Đơn mua hàng
            </NavLink>
            <NavLink to="/products" className={getNavClass}>
              Sản phẩm
            </NavLink>
            <NavLink to="/suppliers" className={getNavClass}>
              Nhà cung cấp
            </NavLink>
            <NavLink to="/inventory" className={getNavClass}>
              Tồn kho
            </NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              Xin chào, <strong className="font-semibold">{user?.username || 'Nhân viên'}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}