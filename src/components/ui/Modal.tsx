import type { ReactNode } from 'react'
import Button from './Button'

interface ModalProps {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
  onConfirm?: () => void
}

const Modal = ({ open, title, children, onClose, onConfirm }: ModalProps) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-4">
        <h3 className="mb-3 text-base font-semibold">{title}</h3>
        <div className="text-sm text-slate-700">{children}</div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          {onConfirm ? <Button onClick={onConfirm}>Confirm</Button> : null}
        </div>
      </div>
    </div>
  )
}

export default Modal
