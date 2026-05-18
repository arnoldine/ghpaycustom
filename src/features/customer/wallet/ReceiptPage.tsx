import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { walletApi } from '../../../api/walletApi'
import { LoadingState } from '../../../components/ui/LoadingState'
import { Receipt } from '../../../components/ui/Receipt'

export const ReceiptPage = () => {
  const { transactionId = '' } = useParams()
  const query = useQuery({ queryKey: ['receipt', transactionId], queryFn: () => walletApi.getReceipt(transactionId) })
  if (query.isLoading) return <LoadingState />
  if (!query.data?.success || !query.data.data) return <p className="text-sm text-red-600">Receipt unavailable.</p>
  return <Receipt receipt={query.data.data} />
}
