import { Card } from './Card'
import { Button } from './Button'

interface ModalProps {
  open: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
  onConfirm?: () => void
  confirmLabel?: string
}

export const Modal = ({ open, title, children, onClose, onConfirm, confirmLabel = 'Confirm' }: ModalProps) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <Card className="w-full max-w-md space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div>{children}</div>
        <div className="flex justify-end gap-2">
          <Button className="bg-slate-500" onClick={onClose}>Cancel</Button>
          {onConfirm && <Button onClick={onConfirm}>{confirmLabel}</Button>}
        </div>
      </Card>
    </div>
  )
}
