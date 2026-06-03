import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { AppShell } from './components/layout/AppShell';
import { Home, Orders, Products, Customers, Analytics, Settings, Login, ForgotPassword } from './pages';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/forgot-password',
    Component: ForgotPassword,
  },
  {
    path: '/',
    Component: AppShell,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: 'dashboard', Component: Home },
      { path: 'orders', Component: Orders },
      { path: 'products', Component: Products },
      { path: 'customers', Component: Customers },
      { path: 'analytics', Component: Analytics },
      { path: 'settings', Component: Settings },
    ],
  },
]);
