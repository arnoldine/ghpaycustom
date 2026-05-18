import type { AuthSession, LoginRequest, User } from '../types/auth'
import type { AdminCustomerSummary, AdminDashboardPayload } from '../types/admin'
import type { CustomerProfile, Device } from '../types/customer'
import type { KycRequest } from '../types/kyc'
import type { ReconciliationItem, ReconciliationSummary } from '../types/reconciliation'
import type {
  PaymentRequest,
  Receipt,
  Transaction,
  TransactionChannel,
  TransactionStatus,
} from '../types/transaction'
import type { CashTransactionRequest, TransferRequest, WalletBalance } from '../types/wallet'

interface ApiResponse<T> {
  success: boolean
  responseCode: string
  message: string
  data: T
  reference: string
  timestamp: string
}

const nowIso = () => new Date().toISOString()
const ref = (prefix = 'REF') => `${prefix}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`
const wait = <T>(data: T, ms = 500) => new Promise<T>((resolve) => setTimeout(() => resolve(data), ms))

const users: Record<string, User & { password: string; attempts: number }> = {
  'customer@demo.com': {
    id: 'u1',
    fullName: 'Kwame Mensah',
    email: 'customer@demo.com',
    phone: '0240001111',
    role: 'CUSTOMER',
    customerId: 'c1',
    password: 'Password123!',
    attempts: 0,
  },
  'admin@demo.com': {
    id: 'u2',
    fullName: 'Ama Asante',
    email: 'admin@demo.com',
    phone: '0241002222',
    role: 'ADMIN',
    password: 'Password123!',
    attempts: 0,
  },
  'operations@demo.com': {
    id: 'u3',
    fullName: 'Kojo Operations',
    email: 'operations@demo.com',
    phone: '0242003333',
    role: 'OPERATIONS',
    password: 'Password123!',
    attempts: 0,
  },
  'compliance@demo.com': {
    id: 'u4',
    fullName: 'Efua Compliance',
    email: 'compliance@demo.com',
    phone: '0243004444',
    role: 'COMPLIANCE',
    password: 'Password123!',
    attempts: 0,
  },
  'support@demo.com': {
    id: 'u5',
    fullName: 'Yaw Support',
    email: 'support@demo.com',
    phone: '0244005555',
    role: 'SUPPORT',
    password: 'Password123!',
    attempts: 0,
  },
}

const customers: CustomerProfile[] = [
  {
    id: 'c1',
    fullName: 'Kwame Mensah',
    phone: '0240001111',
    email: 'customer@demo.com',
    ghanaCard: 'GHA-123456789-1',
    address: 'Adabraka, Accra',
    kycStatus: 'PENDING',
    walletStatus: 'ACTIVE',
  },
  {
    id: 'c2',
    fullName: 'Akosua Boateng',
    phone: '0246678888',
    email: 'akosua@demo.com',
    ghanaCard: 'GHA-777777777-2',
    address: 'Kumasi Central',
    kycStatus: 'VERIFIED',
    walletStatus: 'ACTIVE',
  },
]

const balances: Record<string, WalletBalance> = {
  c1: { walletId: 'WAL-001', availableBalance: 2850.35, ledgerBalance: 2850.35, currency: 'GHS' },
  c2: { walletId: 'WAL-002', availableBalance: 4920.0, ledgerBalance: 4920.0, currency: 'GHS' },
}

const devices: Record<string, Device[]> = {
  c1: [
    { id: 'dev-001', name: 'Samsung A54', lastLogin: nowIso(), linked: true, current: true },
    { id: 'dev-002', name: 'Tecno Spark', lastLogin: new Date(Date.now() - 86400000).toISOString(), linked: false },
  ],
}

let transactions: Transaction[] = [
  {
    id: 'tx-001',
    customerId: 'c1',
    customerName: 'Kwame Mensah',
    channel: 'MOBILE_MONEY',
    amount: 120,
    status: 'SUCCESSFUL',
    reference: 'MM-001',
    narration: 'Send to MTN',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'tx-002',
    customerId: 'c1',
    customerName: 'Kwame Mensah',
    channel: 'GHQR',
    amount: 76.2,
    status: 'PENDING',
    reference: 'QR-002',
    narration: 'Merchant payment',
    createdAt: new Date(Date.now() - 8200000).toISOString(),
  },
]

let pinAttempts = 0
const mockPinEnabled = import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCK_PIN === 'true'
const configuredDemoPin = import.meta.env.VITE_DEMO_PIN

const respond = <T>(data: T, message = 'Request successful', success = true): ApiResponse<T> => ({
  success,
  responseCode: success ? '000' : '999',
  message,
  data,
  reference: ref('API'),
  timestamp: nowIso(),
})

const assertPin = (pin: string) => {
  if (!mockPinEnabled) throw new Error('PIN validation disabled. Enable mock PIN mode for demo transactions.')
  if (!configuredDemoPin) throw new Error('Demo PIN not configured. Set VITE_DEMO_PIN to enable transaction simulation.')

  if (pin !== configuredDemoPin) {
    pinAttempts += 1
    if (pinAttempts >= 3) throw new Error('Too many failed PIN attempts. Please wait and retry.')
    throw new Error(`Invalid PIN. Attempts remaining: ${Math.max(0, 3 - pinAttempts)}`)
  }
  pinAttempts = 0
}

const createTransaction = (
  channel: TransactionChannel,
  amount: number,
  narration: string,
  customerId = 'c1',
  customerName = 'Kwame Mensah',
): Transaction => {
  const statuses: TransactionStatus[] = ['SUCCESSFUL', 'PENDING', 'FAILED', 'REVERSED']
  const status = statuses[Math.floor(Math.random() * statuses.length)]
  const tx: Transaction = {
    id: `tx-${Date.now()}`,
    customerId,
    customerName,
    channel,
    amount,
    status,
    reference: ref('TX'),
    narration,
    createdAt: nowIso(),
  }
  transactions = [tx, ...transactions]
  return tx
}

export const mockServer = {
  async login(payload: LoginRequest) {
    const account = users[payload.email]
    if (!account) return wait(respond(null, 'Invalid credentials', false))
    if (account.attempts >= 5) return wait(respond(null, 'Account temporarily locked due to failed attempts', false))
    if (account.password !== payload.password) {
      account.attempts += 1
      return wait(respond(null, `Invalid credentials. Attempts: ${account.attempts}/5`, false))
    }
    account.attempts = 0
    const session: AuthSession = {
      token: btoa(`${payload.email}:${Date.now()}`),
      expiresAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
      user: {
        id: account.id,
        fullName: account.fullName,
        email: account.email,
        phone: account.phone,
        role: account.role,
        customerId: account.customerId,
      },
    }
    return wait(respond(session, 'Login successful'))
  },

  async logout() {
    return wait(respond({ loggedOut: true }, 'Logged out'))
  },

  async getBalance(customerId = 'c1') {
    return wait(respond(balances[customerId]))
  },

  async getMiniStatement(customerId = 'c1') {
    return wait(respond(transactions.filter((t) => t.customerId === customerId).slice(0, 5)))
  },

  async getTransactions(customerId = 'c1') {
    return wait(respond(transactions.filter((t) => t.customerId === customerId)))
  },

  async createTransfer(payload: TransferRequest) {
    assertPin(payload.pin)
    const tx = createTransaction(
      payload.destinationType === 'BANK_ACCOUNT'
        ? 'BANK_TRANSFER'
        : payload.destinationType === 'MOBILE_MONEY'
          ? 'MOBILE_MONEY'
          : 'GHANAPAY_WALLET',
      payload.amount,
      payload.narration,
    )
    return wait(respond(tx, 'Transfer initiated'))
  },

  async cashIn(payload: CashTransactionRequest) {
    assertPin(payload.pin)
    const tx = createTransaction('CASH_IN', payload.amount, payload.narration)
    return wait(respond(tx, 'Cash-in submitted'))
  },

  async cashOut(payload: CashTransactionRequest) {
    assertPin(payload.pin)
    const tx = createTransaction('CASH_OUT', payload.amount, payload.narration)
    return wait(respond(tx, 'Cash-out submitted'))
  },

  async payGhQR(payload: PaymentRequest) {
    assertPin(payload.pin)
    const tx = createTransaction('GHQR', payload.amount, payload.narration)
    return wait(respond(tx, 'GhQR payment submitted'))
  },

  async buyAirtime(payload: PaymentRequest) {
    assertPin(payload.pin)
    const tx = createTransaction('AIRTIME', payload.amount, payload.narration)
    return wait(respond(tx, 'Airtime purchase submitted'))
  },

  async payBill(payload: PaymentRequest) {
    assertPin(payload.pin)
    const tx = createTransaction('BILL_PAYMENT', payload.amount, payload.narration)
    return wait(respond(tx, 'Bill payment submitted'))
  },

  async submitKyc(customerId: string, payload: KycRequest) {
    const customer = customers.find((c) => c.id === customerId)
    if (customer) {
      customer.fullName = payload.fullName
      customer.phone = payload.phoneNumber
      customer.address = payload.address
      customer.ghanaCard = payload.ghanaCardNumber
      customer.kycStatus = 'PENDING'
    }
    return wait(respond(customer, 'KYC submitted for review'))
  },

  async getDevices(customerId = 'c1') {
    return wait(respond(devices[customerId] ?? []))
  },

  async registerDevice(customerId = 'c1') {
    const device: Device = {
      id: `dev-${Date.now()}`,
      name: 'New Android Device',
      lastLogin: nowIso(),
      linked: true,
    }
    devices[customerId] = [device, ...(devices[customerId] ?? [])]
    return wait(respond(device, 'Device registration request submitted'))
  },

  async unlinkDevice(customerId = 'c1', deviceId?: string) {
    devices[customerId] = (devices[customerId] ?? []).map((item) =>
      item.id === deviceId ? { ...item, linked: false } : item,
    )
    return wait(respond({ success: true }, 'Device unlink request submitted'))
  },

  async getDashboardStats(): Promise<ApiResponse<AdminDashboardPayload>> {
    const failed = transactions.filter((t) => t.status === 'FAILED').length
    const stats = {
      totalWallets: 2186,
      activeWallets: 1934,
      totalTransactionValueToday: 820441.62,
      transactionCountToday: 4310,
      failedTransactions: failed,
      pendingReconciliations: 42,
      openDisputes: 17,
      suspiciousAlerts: 9,
    }
    return wait(
      respond({
        stats,
        volumeByChannel: [
          { name: 'Wallet', value: 1200 },
          { name: 'Bank', value: 800 },
          { name: 'MoMo', value: 1900 },
          { name: 'GhQR', value: 410 },
        ],
        successVsFailed: [
          { name: '10:00', success: 120, failed: 8, value: 0 },
          { name: '12:00', success: 180, failed: 15, value: 0 },
          { name: '14:00', success: 210, failed: 11, value: 0 },
          { name: '16:00', success: 240, failed: 9, value: 0 },
        ],
        walletGrowth: [
          { name: 'Jan', value: 1700 },
          { name: 'Feb', value: 1760 },
          { name: 'Mar', value: 1822 },
          { name: 'Apr', value: 1881 },
          { name: 'May', value: 1934 },
        ],
      }),
    )
  },



  async getCustomerProfile(customerId = 'c1') {
    const customer = customers.find((c) => c.id === customerId) ?? null
    return wait(respond(customer))
  },

  async getCustomers(search = '') {
    const q = search.toLowerCase()
    const data: AdminCustomerSummary[] = customers
      .filter((c) =>
        [c.fullName, c.phone, c.ghanaCard, c.kycStatus, c.walletStatus].join(' ').toLowerCase().includes(q),
      )
      .map((c) => ({
        ...c,
        walletId: balances[c.id]?.walletId ?? 'N/A',
        recentTransactions: transactions.filter((t) => t.customerId === c.id).slice(0, 3),
      }))
    return wait(respond(data))
  },

  async getAdminTransactions() {
    return wait(respond(transactions))
  },

  async getDisputes() {
    const disputes = [
      { id: 'd1', customer: 'Kwame Mensah', subject: 'Failed transfer reversal', status: 'OPEN', note: 'Awaiting ops.' },
      { id: 'd2', customer: 'Akosua Boateng', subject: 'GhQR debit mismatch', status: 'IN_REVIEW', note: 'Verifying settlement.' },
    ]
    return wait(respond(disputes))
  },

  async updateDispute(id: string, status: string, note: string) {
    return wait(respond({ id, status, note }, 'Dispute updated'))
  },

  async getRiskAlerts() {
    return wait(
      respond([
        { id: 'r1', type: 'multiple failed PIN attempts', severity: 'HIGH', customer: 'Kwame Mensah' },
        { id: 'r2', type: 'unusual transaction amount', severity: 'MEDIUM', customer: 'Akosua Boateng' },
        { id: 'r3', type: 'new device login', severity: 'LOW', customer: 'Yaw Mensima' },
        { id: 'r4', type: 'repeated failed transfers', severity: 'HIGH', customer: 'Kofi Nartey' },
        { id: 'r5', type: 'high cash-out frequency', severity: 'HIGH', customer: 'Abena Ntim' },
      ]),
    )
  },

  async getAuditLogs() {
    return wait(
      respond([
        {
          id: 'a1',
          user: 'Ama Asante',
          action: 'Updated customer wallet status',
          module: 'Wallets',
          timestamp: nowIso(),
          ipDevice: '10.0.4.1 / Chrome Android',
          outcome: 'SUCCESS',
        },
      ]),
    )
  },

  async getReconciliationDashboard() {
    const items: ReconciliationItem[] = [
      { id: 'rec-1', source: 'APP', reference: 'TX-111', amount: 140, status: 'MATCHED', createdAt: nowIso() },
      { id: 'rec-2', source: 'GHIPSS', reference: 'TX-112', amount: 300, status: 'UNMATCHED', createdAt: nowIso() },
      { id: 'rec-3', source: 'CBS', reference: 'TX-113', amount: 500, status: 'PENDING', createdAt: nowIso() },
      { id: 'rec-4', source: 'BACKEND', reference: 'TX-114', amount: 110, status: 'EXCEPTION', createdAt: nowIso() },
    ]
    const summary: ReconciliationSummary = {
      matched: items.filter((i) => i.status === 'MATCHED').length,
      unmatched: items.filter((i) => i.status === 'UNMATCHED').length,
      pending: items.filter((i) => i.status === 'PENDING').length,
      exception: items.filter((i) => i.status === 'EXCEPTION').length,
    }
    return wait(respond({ summary, items }))
  },

  async runReconciliation() {
    return wait(respond({ started: true }, 'Reconciliation run completed'))
  },

  async getReceipt(transactionId: string) {
    const tx = transactions.find((item) => item.id === transactionId)
    if (!tx) return wait(respond(null, 'Receipt not found', false))
    const receipt: Receipt = {
      transactionId: tx.id,
      reference: tx.reference,
      amount: tx.amount,
      channel: tx.channel,
      status: tx.status,
      narration: tx.narration,
      customerName: tx.customerName,
      timestamp: tx.createdAt,
      auditTrail: `Captured via ${tx.channel}, ref ${tx.reference}`,
    }
    return wait(respond(receipt))
  },

  async listWallets() {
    return wait(respond(Object.values(balances)))
  },
}
