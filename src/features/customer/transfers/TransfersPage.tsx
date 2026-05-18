import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { transferApi } from '../../../api/transferApi'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { Modal } from '../../../components/ui/Modal'
import { Select } from '../../../components/ui/Select'
import type { TransferRequest } from '../../../types/wallet'

type FormData = z.input<typeof schema>
type FormOutput = z.output<typeof schema>

const schema = z.object({
  destinationType: z.enum(['GHANAPAY_WALLET', 'BANK_ACCOUNT', 'MOBILE_MONEY']),
  recipientName: z.string().min(2),
  recipientAccountOrPhone: z.string().min(5),
  institutionOrNetwork: z.string().min(2),
  amount: z.coerce.number().positive(),
  narration: z.string().min(2),
  pin: z.string().length(4),
})

export const TransfersPage = () => {
  const navigate = useNavigate()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pendingPayload, setPendingPayload] = useState<TransferRequest | null>(null)
  const mutation = useMutation({ mutationFn: transferApi.createTransfer })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData, unknown, FormOutput>({ resolver: zodResolver(schema), defaultValues: { destinationType: 'GHANAPAY_WALLET' } })

  const submit = (payload: FormOutput) => {
    setPendingPayload(payload as TransferRequest)
    setConfirmOpen(true)
  }

  const confirm = async () => {
    if (!pendingPayload) return
    const response = await mutation.mutateAsync(pendingPayload)
    setConfirmOpen(false)
    if (response.success && response.data) navigate(`/receipt/${response.data.id}`)
  }

  const error = useMemo(() => Object.values(errors)[0]?.message ?? (mutation.error as Error | undefined)?.message, [errors, mutation.error])

  return (
    <Card className="space-y-3">
      <h1 className="text-xl font-semibold">Send Money</h1>
      <form className="grid gap-3 md:grid-cols-2" onSubmit={handleSubmit(submit)}>
        <Select {...register('destinationType')}>
          <option value="GHANAPAY_WALLET">GhanaPay Wallet</option>
          <option value="BANK_ACCOUNT">Bank Account</option>
          <option value="MOBILE_MONEY">Mobile Money</option>
        </Select>
        <Input placeholder="Recipient name" {...register('recipientName')} />
        <Input placeholder="Recipient account/phone" {...register('recipientAccountOrPhone')} />
        <Input placeholder="Institution / network" {...register('institutionOrNetwork')} />
        <Input type="number" placeholder="Amount" {...register('amount')} />
        <Input placeholder="Narration" {...register('narration')} />
        <Input type="password" maxLength={4} placeholder="PIN" {...register('pin')} />
        <Button type="submit" className="md:col-span-2">Continue</Button>
      </form>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-slate-500">PIN is never displayed after entry. Review details before confirmation.</p>
      <Modal open={confirmOpen} title="Confirm Transfer" onClose={() => setConfirmOpen(false)} onConfirm={() => void confirm()}>
        <p className="text-sm">Do you want to submit this transfer request?</p>
      </Modal>
    </Card>
  )
}
