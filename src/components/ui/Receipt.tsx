import type { ReceiptData } from '../../types/transaction'
import { formatCurrency } from '../../utils/currency'
import { formatDateTime } from '../../utils/dates'
import Button from './Button'

const Receipt = ({ receipt }: { receipt: ReceiptData }) => (
  <article className="rounded-xl border border-slate-200 bg-white p-4">
    <h3 className="text-base font-semibold">Transaction receipt</h3>
    <dl className="mt-3 grid gap-2 text-sm">
      <div className="flex justify-between"><dt>Reference</dt><dd>{receipt.reference}</dd></div>
      <div className="flex justify-between"><dt>Amount</dt><dd>{formatCurrency(receipt.amount)}</dd></div>
      <div className="flex justify-between"><dt>Channel</dt><dd>{receipt.channel}</dd></div>
      <div className="flex justify-between"><dt>Status</dt><dd>{receipt.status}</dd></div>
      <div className="flex justify-between"><dt>Date</dt><dd>{formatDateTime(receipt.dateTime)}</dd></div>
      <div className="flex justify-between"><dt>Narration</dt><dd>{receipt.narration}</dd></div>
    </dl>
    <Button className="mt-4" onClick={() => window.print()}>
      Print receipt
    </Button>
  </article>
)

export default Receipt
