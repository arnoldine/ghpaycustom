import { createBrowserRouter, Navigate } from 'react-router-dom'
import ProtectedRoute from '../auth/ProtectedRoute'
import AdminLayout from '../components/layout/AdminLayout'
import CustomerLayout from '../components/layout/CustomerLayout'
import CustomerDashboardPage from '../features/customer/dashboard'
import WalletPage from '../features/customer/wallet'
import TransferPage from '../features/customer/transfers'
import { CashInPage, CashOutPage } from '../features/customer/cashServices'
import GhqrPage from '../features/customer/ghqr'
import AirtimeDataPage from '../features/customer/airtimeData'
import BillsPage from '../features/customer/bills'
import { StatementsPage, TransactionsPage } from '../features/customer/statements'
import ComplaintsPage from '../features/customer/complaints'
import ProfilePage from '../features/customer/profile'
import KycPage from '../features/customer/kyc'
import DevicesPage from '../features/customer/devices'
import ReceiptPage from '../features/customer/statements/ReceiptPage'
import { AdminLoginPage, LoginPage, RegisterPage, SetPinPage, VerifyOtpPage } from '../features/customer/profile/AuthPages'
import AdminDashboardPage from '../features/admin/dashboard'
import AdminCustomersPage from '../features/admin/customers'
import AdminWalletsPage from '../features/admin/wallets'
import AdminTransactionsPage from '../features/admin/transactions'
import ReconciliationPage from '../features/admin/reconciliation'
import AgentsPage from '../features/admin/agents'
import MerchantsPage from '../features/admin/merchants'
import DisputesPage from '../features/admin/disputes'
import RiskPage from '../features/admin/risk'
import ReportsPage from '../features/admin/reports'
import AuditLogsPage from '../features/admin/auditLogs'
import SettingsPage from '../features/admin/settings'

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/verify-otp', element: <VerifyOtpPage /> },
  { path: '/set-pin', element: <SetPinPage /> },
  { path: '/admin/login', element: <AdminLoginPage /> },
  {
    element: <ProtectedRoute allowRoles={['CUSTOMER']} />,
    children: [
      {
        element: <CustomerLayout />,
        children: [
          { path: '/dashboard', element: <CustomerDashboardPage /> },
          { path: '/wallet', element: <WalletPage /> },
          { path: '/transactions', element: <TransactionsPage /> },
          { path: '/transfers', element: <TransferPage /> },
          { path: '/cash-in', element: <CashInPage /> },
          { path: '/cash-out', element: <CashOutPage /> },
          { path: '/ghqr', element: <GhqrPage /> },
          { path: '/airtime', element: <AirtimeDataPage /> },
          { path: '/bills', element: <BillsPage /> },
          { path: '/statements', element: <StatementsPage /> },
          { path: '/complaints', element: <ComplaintsPage /> },
          { path: '/profile', element: <ProfilePage /> },
          { path: '/kyc', element: <KycPage /> },
          { path: '/devices', element: <DevicesPage /> },
          { path: '/receipt/:transactionId', element: <ReceiptPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute allowRoles={['ADMIN', 'OPERATIONS', 'COMPLIANCE', 'SUPPORT', 'AGENT_MANAGER', 'MERCHANT_MANAGER', 'AUDITOR']} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: '/admin/dashboard', element: <AdminDashboardPage /> },
          {
            element: <ProtectedRoute allowRoles={['ADMIN', 'OPERATIONS', 'SUPPORT']} adminModule="customers" />,
            children: [{ path: '/admin/customers', element: <AdminCustomersPage /> }],
          },
          {
            element: <ProtectedRoute allowRoles={['ADMIN', 'OPERATIONS']} adminModule="wallets" />,
            children: [{ path: '/admin/wallets', element: <AdminWalletsPage /> }],
          },
          {
            element: <ProtectedRoute allowRoles={['ADMIN', 'OPERATIONS', 'COMPLIANCE', 'SUPPORT']} adminModule="transactions" />,
            children: [{ path: '/admin/transactions', element: <AdminTransactionsPage /> }],
          },
          {
            element: <ProtectedRoute allowRoles={['ADMIN', 'OPERATIONS', 'AUDITOR']} adminModule="reconciliation" />,
            children: [{ path: '/admin/reconciliation', element: <ReconciliationPage /> }],
          },
          {
            element: <ProtectedRoute allowRoles={['ADMIN', 'AGENT_MANAGER']} adminModule="agents" />,
            children: [{ path: '/admin/agents', element: <AgentsPage /> }],
          },
          {
            element: <ProtectedRoute allowRoles={['ADMIN', 'MERCHANT_MANAGER']} adminModule="merchants" />,
            children: [{ path: '/admin/merchants', element: <MerchantsPage /> }],
          },
          {
            element: <ProtectedRoute allowRoles={['ADMIN', 'SUPPORT', 'COMPLIANCE']} adminModule="disputes" />,
            children: [{ path: '/admin/disputes', element: <DisputesPage /> }],
          },
          {
            element: <ProtectedRoute allowRoles={['ADMIN', 'COMPLIANCE']} adminModule="risk" />,
            children: [{ path: '/admin/risk', element: <RiskPage /> }],
          },
          {
            element: <ProtectedRoute allowRoles={['ADMIN', 'OPERATIONS', 'AUDITOR']} adminModule="reports" />,
            children: [{ path: '/admin/reports', element: <ReportsPage /> }],
          },
          {
            element: <ProtectedRoute allowRoles={['ADMIN', 'AUDITOR', 'COMPLIANCE']} adminModule="auditLogs" />,
            children: [{ path: '/admin/audit-logs', element: <AuditLogsPage /> }],
          },
          {
            element: <ProtectedRoute allowRoles={['ADMIN']} adminModule="settings" />,
            children: [{ path: '/admin/settings', element: <SettingsPage /> }],
          },
        ],
      },
    ],
  },
])

export default router
