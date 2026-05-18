import { useQuery } from '@tanstack/react-query'
import { walletApi } from '../../../api/walletApi'
import { Card } from '../../../components/ui/Card'
import { LoadingState } from '../../../components/ui/LoadingState'
import { formatGhs } from '../../../utils/currency'

export const WalletPage = () => {
  const balance = useQuery({ queryKey: ['wallet-balance'], queryFn: walletApi.getBalance })
  if (balance.isLoading) return <LoadingState />
  return (
    <Card className="space-y-2">
      <h1 className="text-xl font-semibold">Wallet Balance</h1>
      <p className="text-3xl font-bold">{formatGhs(balance.data?.data.availableBalance ?? 0)}</p>
      <p className="text-sm text-slate-500">Ledger: {formatGhs(balance.data?.data.ledgerBalance ?? 0)}</p>
    </Card>
  )
}
