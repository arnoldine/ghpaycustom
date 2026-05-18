import { useQuery } from '@tanstack/react-query'
import { walletApi } from '../../../api/walletApi'
import { useAuth } from '../../../auth/useAuth'
import { Card } from '../../../components/ui/Card'
import { LoadingState } from '../../../components/ui/LoadingState'
import { formatGhs } from '../../../utils/currency'

export const WalletPage = () => {
  const { session } = useAuth()
  const customerId = session?.user.customerId ?? 'c1'
  const balance = useQuery({ queryKey: ['wallet-balance', customerId], queryFn: () => walletApi.getBalance(customerId) })
  if (balance.isLoading) return <LoadingState />
  return (
    <Card className="space-y-2">
      <h1 className="text-xl font-semibold">Wallet Balance</h1>
      <p className="text-3xl font-bold">{formatGhs(balance.data?.data.availableBalance ?? 0)}</p>
      <p className="text-sm text-slate-500">Ledger: {formatGhs(balance.data?.data.ledgerBalance ?? 0)}</p>
    </Card>
  )
}
