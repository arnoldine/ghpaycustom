import { Navigate, createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '../auth/ProtectedRoute'
import { AdminLayout } from '../components/layout/AdminLayout'
import { CustomerLayout } from '../components/layout/CustomerLayout'
import { AdminLoginPage } from '../features/admin/dashboard/AdminLoginPage'
import { AdminDashboardPage } from '../features/admin/dashboard/AdminDashboardPage'
import { CustomersPage } from '../features/admin/customers/CustomersPage'
import { WalletsPage } from '../features/admin/wallets/WalletsPage'
import { TransactionsMonitoringPage } from '../features/admin/transactions/TransactionsMonitoringPage'
import { ReconciliationPage } from '../features/admin/reconciliation/ReconciliationPage'
import { AgentsPage } from '../features/admin/agents/AgentsPage'
import { MerchantsPage } from '../features/admin/merchants/MerchantsPage'
import { DisputesPage } from '../features/admin/disputes/DisputesPage'
import { RiskPage } from '../features/admin/risk/RiskPage'
import { ReportsPage } from '../features/admin/reports/ReportsPage'
import { AuditLogsPage } from '../features/admin/auditLogs/AuditLogsPage'
import { SettingsPage } from '../features/admin/settings/SettingsPage'
import { AirtimePage } from '../features/customer/airtimeData/AirtimePage'
import { BillsPage } from '../features/customer/bills/BillsPage'
import { CashInPage } from '../features/customer/cashServices/CashInPage'
import { CashOutPage } from '../features/customer/cashServices/CashOutPage'
import { ComplaintsPage } from '../features/customer/complaints/ComplaintsPage'
import { CustomerDashboardPage } from '../features/customer/dashboard/CustomerDashboardPage'
import { LoginPage } from '../features/customer/dashboard/LoginPage'
import { OtpPage } from '../features/customer/dashboard/OtpPage'
import { RegisterPage } from '../features/customer/dashboard/RegisterPage'
import { SetPinPage } from '../features/customer/dashboard/SetPinPage'
import { DevicesPage } from '../features/customer/devices/DevicesPage'
import { GhqrPage } from '../features/customer/ghqr/GhqrPage'
import { KycPage } from '../features/customer/kyc/KycPage'
import { ProfilePage } from '../features/customer/profile/ProfilePage'
import { StatementsPage } from '../features/customer/statements/StatementsPage'
import { TransfersPage } from '../features/customer/transfers/TransfersPage'
import { ReceiptPage } from '../features/customer/wallet/ReceiptPage'
import { TransactionsPage } from '../features/customer/wallet/TransactionsPage'
import { WalletPage } from '../features/customer/wallet/WalletPage'

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/verify-otp', element: <OtpPage /> },
  { path: '/set-pin', element: <SetPinPage /> },
  {
    element: (
      <ProtectedRoute roles={['CUSTOMER']}>
        <CustomerLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/dashboard', element: <CustomerDashboardPage /> },
      { path: '/wallet', element: <WalletPage /> },
      { path: '/transactions', element: <TransactionsPage /> },
      { path: '/transfers', element: <TransfersPage /> },
      { path: '/cash-in', element: <CashInPage /> },
      { path: '/cash-out', element: <CashOutPage /> },
      { path: '/ghqr', element: <GhqrPage /> },
      { path: '/airtime', element: <AirtimePage /> },
      { path: '/bills', element: <BillsPage /> },
      { path: '/statements', element: <StatementsPage /> },
      { path: '/complaints', element: <ComplaintsPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/kyc', element: <KycPage /> },
      { path: '/devices', element: <DevicesPage /> },
      { path: '/receipt/:transactionId', element: <ReceiptPage /> },
    ],
  },
  { path: '/admin/login', element: <AdminLoginPage /> },
  {
    element: (
      <ProtectedRoute
        roles={['ADMIN', 'OPERATIONS', 'COMPLIANCE', 'SUPPORT', 'AGENT_MANAGER', 'MERCHANT_MANAGER', 'AUDITOR']}
        loginPath="/admin/login"
      >
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/admin/dashboard', element: <AdminDashboardPage /> },
      { path: '/admin/customers', element: <CustomersPage /> },
      { path: '/admin/wallets', element: <WalletsPage /> },
      { path: '/admin/transactions', element: <TransactionsMonitoringPage /> },
      { path: '/admin/reconciliation', element: <ReconciliationPage /> },
      { path: '/admin/agents', element: <AgentsPage /> },
      { path: '/admin/merchants', element: <MerchantsPage /> },
      { path: '/admin/disputes', element: <DisputesPage /> },
      { path: '/admin/risk', element: <RiskPage /> },
      { path: '/admin/reports', element: <ReportsPage /> },
      { path: '/admin/audit-logs', element: <AuditLogsPage /> },
      { path: '/admin/settings', element: <SettingsPage /> },
    ],
  },
])
