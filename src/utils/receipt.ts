import { branding } from '../config/branding'
import type { ReceiptData } from '../types/transaction'
import { formatCurrency } from './currency'
import { formatDateTime } from './dates'

export const printableReceipt = (receipt: ReceiptData): string => {
  return [
    branding.institutionName,
    '--- GhanaPay Transaction Receipt ---',
    `Transaction ID: ${receipt.transactionId}`,
    `Reference: ${receipt.reference}`,
    `Amount: ${formatCurrency(receipt.amount)}`,
    `Channel: ${receipt.channel}`,
    `Status: ${receipt.status}`,
    `Customer: ${receipt.customerName}`,
    `Date: ${formatDateTime(receipt.dateTime)}`,
    `Narration: ${receipt.narration}`,
  ].join('\n')
}
