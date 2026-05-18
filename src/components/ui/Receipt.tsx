import type { Receipt as ReceiptType } from '../../types/transaction'
import { formatDateTime } from '../../utils/dates'
import { formatGhs } from '../../utils/currency'
import { Card } from './Card'
import { Button } from './Button'
import { printReceipt } from '../../utils/receipt'

export const Receipt = ({ receipt }: { receipt: ReceiptType }) => (
  <Card className="space-y-2">
    <h2 className="text-lg font-semibold">Transaction Receipt</h2>
    <p>Transaction ID: {receipt.transactionId}</p>
    <p>Reference: {receipt.reference}</p>
    <p>Amount: {formatGhs(receipt.amount)}</p>
    <p>Channel: {receipt.channel}</p>
    <p>Status: {receipt.status}</p>
    <p>Narration: {receipt.narration}</p>
    <p>Timestamp: {formatDateTime(receipt.timestamp)}</p>
    <p className="text-sm text-slate-500">Audit: {receipt.auditTrail}</p>
    <Button onClick={() => printReceipt(receipt)}>Print Receipt</Button>
  </Card>
)
