import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';

export const LoginScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/purchase-orders', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Đăng Nhập Hệ Thống</h2>
        <LoginForm />
      </div>
    </div>
  );
};