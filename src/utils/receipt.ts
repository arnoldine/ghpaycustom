import type { Receipt } from '../types/transaction'

export const printReceipt = (receipt: Receipt) => {
  const content = `
Transaction Receipt
ID: ${receipt.transactionId}
Reference: ${receipt.reference}
Amount: ${receipt.amount}
Status: ${receipt.status}
Channel: ${receipt.channel}
Time: ${receipt.timestamp}
`
  const popup = window.open('', '_blank')
  if (!popup) return
  const pre = popup.document.createElement('pre')
  pre.textContent = content
  popup.document.body.appendChild(pre)
  popup.document.close()
  popup.print()
}
