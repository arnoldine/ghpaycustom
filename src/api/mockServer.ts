import { branding } from '../config/branding'
import type { AdminCustomer, AdminTransactionView, AuditLog, DashboardStats, RiskAlert } from '../types/admin'
import type { AuthSession, AuthUser, Role } from '../types/auth'
import type { Complaint, CustomerProfile, DeviceInfo } from '../types/customer'
import type { KycSubmission } from '../types/kyc'
import type { ReconciliationItem, ReconciliationOverview } from '../types/reconciliation'
import type { ReceiptData, Transaction } from '../types/transaction'
import type { CashTransactionRequest, PaymentRequest, TransferRequest, WalletBalance } from '../types/wallet'

interface ApiResponse<T> {
  success: boolean
  responseCode: string
  message: string
  data: T
  reference: string
  timestamp: string
}

interface DemoUser {
  user: AuthUser
  password: string
}

const generateRef = (): string => `REF-${Math.random().toString(36).slice(2, 10).toUpperCase()}`
const delay = async (ms = 450): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

const respond = async <T>(data: T, message = 'Request successful', success = true): Promise<ApiResponse<T>> => {
  await delay()
  return {
    success,
    responseCode: success ? '000' : '999',
    message,
    data,
    reference: generateRef(),
    timestamp: new Date().toISOString(),
  }
}

const demoUsers: DemoUser[] = [
  { user: { id: 'cus-1', fullName: 'Ama Mensah', email: 'customer@demo.com', phone: '+233241112223', role: 'CUSTOMER' }, password: 'Password123!' },
  { user: { id: 'adm-1', fullName: 'Kojo Admin', email: 'admin@demo.com', phone: '+233241112224', role: 'ADMIN' }, password: 'Password123!' },
  { user: { id: 'ops-1', fullName: 'Esi Operations', email: 'operations@demo.com', phone: '+233241112225', role: 'OPERATIONS' }, password: 'Password123!' },
  { user: { id: 'cmp-1', fullName: 'Yaw Compliance', email: 'compliance@demo.com', phone: '+233241112226', role: 'COMPLIANCE' }, password: 'Password123!' },
  { user: { id: 'sup-1', fullName: 'Naa Support', email: 'support@demo.com', phone: '+233241112227', role: 'SUPPORT' }, password: 'Password123!' },
]

const balances: Record<string, WalletBalance> = {
  'cus-1': { walletId: 'WAL-1020001', currency: 'GHS', availableBalance: 4820.55, ledgerBalance: 4890.55 },
}

const loginAttempts: Record<string, number> = {}
const pinAttemptsByUser: Record<string, number> = {}

const baseTransactions: Transaction[] = [
  {
    id: 'txn-1001',
    reference: 'GPY-1001',
    customerId: 'cus-1',
    customerName: 'Ama Mensah',
    amount: 120,
    channel: 'GHANAPAY_WALLET',
    status: 'SUCCESSFUL',
    narration: 'Lunch transfer',
    dateTime: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'txn-1002',
    reference: 'GPY-1002',
    customerId: 'cus-1',
    customerName: 'Ama Mensah',
    amount: 300,
    channel: 'MOBILE_MONEY',
    status: 'PENDING',
    narration: 'MoMo transfer',
    dateTime: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
]

let transactions = [...baseTransactions]

const customerProfile: CustomerProfile = {
  id: 'cus-1',
  fullName: 'Ama Mensah',
  email: 'customer@demo.com',
  phone: '+233241112223',
  ghanaCardNumber: 'GHA-123456789-1',
  address: 'Airport Residential, Accra',
  kycStatus: 'PENDING',
}

let devices: DeviceInfo[] = [
  {
    deviceId: 'DEV-01A2B3',
    deviceName: 'Samsung Galaxy A54',
    linked: true,
    current: true,
    lastLogin: new Date().toISOString(),
  },
]

let complaints: Complaint[] = [
  {
    id: 'comp-1',
    title: 'Delayed MoMo transfer',
    message: 'Transfer has stayed pending for over 2 hours.',
    status: 'IN_REVIEW',
    createdAt: new Date(Date.now() - 1000 * 60 * 160).toISOString(),
    internalNote: 'Under review by support queue',
  },
]

const adminCustomers: AdminCustomer[] = [
  {
    id: 'cus-1',
    fullName: 'Ama Mensah',
    phone: '+233241112223',
    ghanaCard: 'GHA-123456789-1',
    kycStatus: 'PENDING',
    walletStatus: 'ACTIVE',
  },
  {
    id: 'cus-2',
    fullName: 'Kofi Osei',
    phone: '+233204445556',
    ghanaCard: 'GHA-987654321-2',
    kycStatus: 'VERIFIED',
    walletStatus: 'ACTIVE',
  },
]

const riskAlerts: RiskAlert[] = [
  { id: 'alert-1', alertType: 'multiple failed PIN attempts', customer: 'Ama Mensah', timestamp: new Date().toISOString(), status: 'OPEN' },
  { id: 'alert-2', alertType: 'high cash-out frequency', customer: 'Kofi Osei', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), status: 'ACKNOWLEDGED' },
]

const auditLogs: AuditLog[] = [
  {
    id: 'audit-1',
    user: 'Kojo Admin',
    action: 'Viewed transaction queue',
    module: 'transactions',
    timestamp: new Date().toISOString(),
    ipOrDevice: '196.32.15.10 / Chrome',
    outcome: 'SUCCESS',
  },
]

let reconciliationItems: ReconciliationItem[] = [
  { id: 'rec-1', source: 'APP', reference: 'GPY-1001', amount: 120, status: 'MATCHED', note: 'App record matches backend & GhIPSS' },
  { id: 'rec-2', source: 'GHIPSS', reference: 'GPY-1009', amount: 75, status: 'EXCEPTION', note: 'Settlement posted but app missing' },
  { id: 'rec-3', source: 'CBS', reference: 'GPY-1011', amount: 42, status: 'PENDING', note: 'Core banking posting pending' },
]

const getOverview = (): ReconciliationOverview => ({
  matched: reconciliationItems.filter((i) => i.status === 'MATCHED').length,
  unmatched: reconciliationItems.filter((i) => i.status === 'UNMATCHED').length,
  pending: reconciliationItems.filter((i) => i.status === 'PENDING').length,
  exceptions: reconciliationItems.filter((i) => i.status === 'EXCEPTION').length,
})

const createTransaction = (
  channel: Transaction['channel'],
  amount: number,
  narration: string,
  customerId = 'cus-1',
  customerName = 'Ama Mensah',
): Transaction => ({
  id: `txn-${Date.now()}`,
  reference: `GPY-${Math.floor(Math.random() * 100000)}`,
  customerId,
  customerName,
  amount,
  channel,
  status: Math.random() > 0.15 ? 'SUCCESSFUL' : 'PENDING',
  narration,
  dateTime: new Date().toISOString(),
})

const verifyPin = (userId: string, pin: string): boolean => {
  if (pin === '1234') {
    pinAttemptsByUser[userId] = 0
    return true
  }
  pinAttemptsByUser[userId] = (pinAttemptsByUser[userId] ?? 0) + 1
  return false
}

const getMaskedPhone = (phone: string): string => `${phone.slice(0, 4)}****${phone.slice(-2)}`

export const mockServer = {
  async login(email: string, password: string): Promise<ApiResponse<AuthSession | null>> {
    const user = demoUsers.find((item) => item.user.email === email)
    if (!user || user.password !== password) {
      loginAttempts[email] = (loginAttempts[email] ?? 0) + 1
      return respond(null, `Invalid credentials. Attempt ${loginAttempts[email]}`, false)
    }
    loginAttempts[email] = 0
    return respond({ token: `mock-jwt-${generateRef()}`, user: user.user }, 'Login successful')
  },

  async logout(): Promise<ApiResponse<null>> {
    return respond(null, 'Logged out successfully')
  },

  async getBalance(userId: string): Promise<ApiResponse<WalletBalance>> {
    return respond(balances[userId] ?? balances['cus-1'])
  },

  async getMiniStatement(userId: string): Promise<ApiResponse<Transaction[]>> {
    return respond(transactions.filter((txn) => txn.customerId === userId).slice(0, 5))
  },

  async getTransactions(userId: string): Promise<ApiResponse<Transaction[]>> {
    return respond(transactions.filter((txn) => txn.customerId === userId))
  },

  async createTransfer(userId: string, request: TransferRequest): Promise<ApiResponse<ReceiptData | null>> {
    if (!verifyPin(userId, request.pin)) {
      return respond(null, `Invalid PIN attempt ${(pinAttemptsByUser[userId] ?? 0)}`, false)
    }
    const balance = balances[userId]
    if (!balance || balance.availableBalance < request.amount) {
      return respond(null, 'Insufficient funds', false)
    }
    balance.availableBalance -= request.amount
    const transaction = createTransaction(request.destinationType, request.amount, request.narration)
    transactions = [transaction, ...transactions]
    return respond({
      transactionId: transaction.id,
      reference: transaction.reference,
      amount: transaction.amount,
      channel: transaction.channel,
      status: transaction.status,
      narration: transaction.narration,
      dateTime: transaction.dateTime,
      customerName: transaction.customerName,
      institutionName: branding.institutionName,
    })
  },

  async cashService(userId: string, request: CashTransactionRequest): Promise<ApiResponse<ReceiptData | null>> {
    if (!verifyPin(userId, request.pin)) {
      return respond(null, `Invalid PIN attempt ${(pinAttemptsByUser[userId] ?? 0)}`, false)
    }
    const transaction = createTransaction(request.type, request.amount, request.narration)
    if (request.type === 'CASH_IN') {
      balances[userId].availableBalance += request.amount
    } else if (balances[userId].availableBalance >= request.amount) {
      balances[userId].availableBalance -= request.amount
    }
    transactions = [transaction, ...transactions]
    return respond({
      transactionId: transaction.id,
      reference: transaction.reference,
      amount: transaction.amount,
      channel: transaction.channel,
      status: transaction.status,
      narration: transaction.narration,
      dateTime: transaction.dateTime,
      customerName: transaction.customerName,
      institutionName: branding.institutionName,
    })
  },

  async payGhQR(userId: string, request: PaymentRequest): Promise<ApiResponse<ReceiptData | null>> {
    if (!verifyPin(userId, request.pin)) {
      return respond(null, `Invalid PIN attempt ${(pinAttemptsByUser[userId] ?? 0)}`, false)
    }
    const transaction = createTransaction('GHQR', request.amount, `${request.narration} (${request.merchantId})`)
    balances[userId].availableBalance -= request.amount
    transactions = [transaction, ...transactions]
    return respond({
      transactionId: transaction.id,
      reference: transaction.reference,
      amount: transaction.amount,
      channel: transaction.channel,
      status: transaction.status,
      narration: transaction.narration,
      dateTime: transaction.dateTime,
      customerName: transaction.customerName,
      institutionName: branding.institutionName,
    })
  },

  async buyAirtime(userId: string, request: PaymentRequest): Promise<ApiResponse<ReceiptData | null>> {
    if (!verifyPin(userId, request.pin)) {
      return respond(null, `Invalid PIN attempt ${(pinAttemptsByUser[userId] ?? 0)}`, false)
    }
    const transaction = createTransaction('AIRTIME', request.amount, request.narration)
    balances[userId].availableBalance -= request.amount
    transactions = [transaction, ...transactions]
    return respond({
      transactionId: transaction.id,
      reference: transaction.reference,
      amount: transaction.amount,
      channel: transaction.channel,
      status: transaction.status,
      narration: transaction.narration,
      dateTime: transaction.dateTime,
      customerName: transaction.customerName,
      institutionName: branding.institutionName,
    })
  },

  async payBill(userId: string, request: PaymentRequest): Promise<ApiResponse<ReceiptData | null>> {
    if (!verifyPin(userId, request.pin)) {
      return respond(null, `Invalid PIN attempt ${(pinAttemptsByUser[userId] ?? 0)}`, false)
    }
    const transaction = createTransaction('BILL_PAYMENT', request.amount, request.narration)
    balances[userId].availableBalance -= request.amount
    transactions = [transaction, ...transactions]
    return respond({
      transactionId: transaction.id,
      reference: transaction.reference,
      amount: transaction.amount,
      channel: transaction.channel,
      status: transaction.status,
      narration: transaction.narration,
      dateTime: transaction.dateTime,
      customerName: transaction.customerName,
      institutionName: branding.institutionName,
    })
  },

  async submitKyc(payload: KycSubmission): Promise<ApiResponse<{ status: CustomerProfile['kycStatus'] }>> {
    customerProfile.fullName = payload.fullName
    customerProfile.phone = payload.phoneNumber
    customerProfile.address = payload.address
    customerProfile.ghanaCardNumber = payload.ghanaCardNumber
    customerProfile.kycStatus = 'PENDING'
    return respond({ status: customerProfile.kycStatus }, 'KYC submitted successfully')
  },

  async getCustomerProfile(): Promise<ApiResponse<CustomerProfile>> {
    return respond({ ...customerProfile, phone: getMaskedPhone(customerProfile.phone), ghanaCardNumber: `${customerProfile.ghanaCardNumber.slice(0, 8)}******` })
  },

  async getDevices(): Promise<ApiResponse<DeviceInfo[]>> {
    return respond(devices)
  },

  async registerDevice(deviceName: string): Promise<ApiResponse<DeviceInfo>> {
    const device: DeviceInfo = {
      deviceId: `DEV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      deviceName,
      linked: true,
      current: false,
      lastLogin: new Date().toISOString(),
    }
    devices = [device, ...devices]
    return respond(device, 'Device registered and linked')
  },

  async unlinkDevice(deviceId: string): Promise<ApiResponse<DeviceInfo[]>> {
    devices = devices.map((device) => (device.deviceId === deviceId ? { ...device, linked: false } : device))
    return respond(devices, 'Unlink request logged')
  },

  async getComplaints(): Promise<ApiResponse<Complaint[]>> {
    return respond(complaints)
  },

  async submitComplaint(title: string, message: string): Promise<ApiResponse<Complaint>> {
    const complaint: Complaint = {
      id: `comp-${Date.now()}`,
      title,
      message,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
    }
    complaints = [complaint, ...complaints]
    return respond(complaint, 'Complaint lodged')
  },

  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return respond({
      totalWallets: 25340,
      activeWallets: 20672,
      totalTransactionValueToday: 1200480,
      transactionCountToday: 18120,
      failedTransactions: 47,
      pendingReconciliations: 12,
      openDisputes: complaints.filter((item) => item.status !== 'RESOLVED').length,
      suspiciousAlerts: riskAlerts.length,
      channelVolume: [
        { channel: 'Wallet', value: 45 },
        { channel: 'MoMo', value: 28 },
        { channel: 'Bank', value: 18 },
        { channel: 'GhQR', value: 9 },
      ],
      successFailedTrend: [
        { name: '08:00', success: 320, failed: 7 },
        { name: '10:00', success: 510, failed: 11 },
        { name: '12:00', success: 740, failed: 13 },
      ],
      walletGrowth: [
        { month: 'Jan', wallets: 19000 },
        { month: 'Feb', wallets: 20300 },
        { month: 'Mar', wallets: 21880 },
        { month: 'Apr', wallets: 23670 },
      ],
    })
  },

  async getCustomers(): Promise<ApiResponse<AdminCustomer[]>> {
    return respond(adminCustomers)
  },

  async getTransactionsForAdmin(): Promise<ApiResponse<AdminTransactionView[]>> {
    return respond(transactions.map((txn) => ({ ...txn, customer: txn.customerName })))
  },

  async getRiskAlerts(): Promise<ApiResponse<RiskAlert[]>> {
    return respond(riskAlerts)
  },

  async getAuditLogs(): Promise<ApiResponse<AuditLog[]>> {
    return respond(auditLogs)
  },

  async updateComplaintStatus(id: string, status: Complaint['status'], internalNote: string): Promise<ApiResponse<Complaint[]>> {
    complaints = complaints.map((item) => (item.id === id ? { ...item, status, internalNote } : item))
    return respond(complaints, 'Complaint status updated')
  },

  async getReconciliation(): Promise<ApiResponse<{ overview: ReconciliationOverview; items: ReconciliationItem[] }>> {
    return respond({ overview: getOverview(), items: reconciliationItems })
  },

  async runReconciliation(): Promise<ApiResponse<{ overview: ReconciliationOverview; items: ReconciliationItem[] }>> {
    reconciliationItems = reconciliationItems.map((item) =>
      item.status === 'PENDING' ? { ...item, status: Math.random() > 0.5 ? 'MATCHED' : 'EXCEPTION', note: 'Run completed' } : item,
    )
    return respond({ overview: getOverview(), items: reconciliationItems }, 'Reconciliation run completed')
  },
}

export type { ApiResponse }

export const mockLookups = {
  demoUsers: demoUsers.map(({ user }) => ({ ...user, role: user.role as Role })),
}
