import type { Receipt } from '../types/transaction'

export const printReceipt = (receipt: Receipt) => {
  const content = `\nTransaction Receipt\nID: ${receipt.transactionId}\nReference: ${receipt.reference}\nAmount: ${receipt.amount}\nStatus: ${receipt.status}\nChannel: ${receipt.channel}\nTime: ${receipt.timestamp}\n`
  const popup = window.open('', '_blank')
  if (!popup) return
  popup.document.write(`<pre>${content}</pre>`)
  popup.document.close()
  popup.print()
}
