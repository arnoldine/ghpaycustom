import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { branding } from '../../../config/branding'
import Receipt from '../../../components/ui/Receipt'
import LoadingState from '../../../components/ui/LoadingState'
import { walletApi } from '../../../api/walletApi'
import { useAuthStore } from '../../../auth/authStore'

const ReceiptPage = () => {
  const userId = useAuthStore((state) => state.user?.id ?? 'cus-1')
  const { transactionId = '' } = useParams()
  const txQuery = useQuery({ queryKey: ['receipt-transactions', userId], queryFn: () => walletApi.getTransactions(userId) })

  if (txQuery.isLoading) {
    return <LoadingState message="Loading receipt..." />
  }

  const transaction = txQuery.data?.data.find((item) => item.id === transactionId)

  if (!transaction) {
    return <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">Receipt not found.</div>
  }

  return (
    <Receipt
      receipt={{
        transactionId: transaction.id,
        reference: transaction.reference,
        amount: transaction.amount,
        channel: transaction.channel,
        status: transaction.status,
        narration: transaction.narration,
        dateTime: transaction.dateTime,
        customerName: transaction.customerName,
        institutionName: branding.institutionName,
      }}
    />
  )
}

export default ReceiptPage
