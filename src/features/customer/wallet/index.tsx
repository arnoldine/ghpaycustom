import { useQuery } from '@tanstack/react-query'
import { walletApi } from '../../../api/walletApi'
import { useAuthStore } from '../../../auth/authStore'
import Card from '../../../components/ui/Card'
import LoadingState from '../../../components/ui/LoadingState'
import { formatCurrency } from '../../../utils/currency'

const WalletPage = () => {
  const userId = useAuthStore((state) => state.user?.id ?? 'cus-1')
  const balanceQuery = useQuery({ queryKey: ['wallet-balance', userId], queryFn: () => walletApi.getBalance(userId) })
  const miniStatementQuery = useQuery({ queryKey: ['wallet-mini', userId], queryFn: () => walletApi.getMiniStatement(userId) })

  if (balanceQuery.isLoading || miniStatementQuery.isLoading) {
    return <LoadingState message="Loading wallet..." />
  }

  return (
    <div className="grid gap-4">
      <Card title="Wallet balance">
        <p className="text-3xl font-bold text-slate-900">{formatCurrency(balanceQuery.data?.data.availableBalance ?? 0)}</p>
        <p className="text-sm text-slate-500">Ledger: {formatCurrency(balanceQuery.data?.data.ledgerBalance ?? 0)}</p>
      </Card>
      <Card title="Mini statement">
        <div className="grid gap-2 text-sm">
          {miniStatementQuery.data?.data.map((item) => (
            <div key={item.id} className="flex justify-between rounded-lg border border-slate-200 p-2">
              <span>{item.narration}</span>
              <span className="font-semibold">{formatCurrency(item.amount)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default WalletPage
