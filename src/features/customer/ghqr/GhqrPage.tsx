import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { paymentApi } from '../../../api/paymentApi'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { Modal } from '../../../components/ui/Modal'

const schema = z.object({
  merchantId: z.string().min(3),
  amount: z.coerce.number().positive(),
  narration: z.string().min(2),
  pin: z.string().length(4),
})

type FormData = z.input<typeof schema>
type FormOutput = z.output<typeof schema>

export const GhqrPage = () => {
  const navigate = useNavigate()
  const mutation = useMutation({ mutationFn: paymentApi.payGhQR })
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [payload, setPayload] = useState<FormOutput | null>(null)
  const { register, handleSubmit } = useForm<FormData, unknown, FormOutput>({ resolver: zodResolver(schema) })

  const submit = (data: FormOutput) => {
    setPayload(data)
    setConfirmOpen(true)
  }

  const confirm = async () => {
    if (!payload) return
    const response = await mutation.mutateAsync(payload)
    if (response.success && response.data) navigate(`/receipt/${response.data.id}`)
  }

  return (
    <Card className="space-y-3">
      <h1 className="text-xl font-semibold">GhQR Payment</h1>
      <div className="rounded border border-dashed p-6 text-center text-sm text-slate-500">QR Scanner Placeholder Area</div>
      <form className="grid gap-3 md:grid-cols-2" onSubmit={handleSubmit(submit)}>
        <Input placeholder="Merchant ID" {...register('merchantId')} />
        <Input type="number" placeholder="Amount" {...register('amount')} />
        <Input placeholder="Narration" {...register('narration')} />
        <Input type="password" maxLength={4} placeholder="PIN" {...register('pin')} />
        <Button type="submit" className="md:col-span-2">Pay Merchant</Button>
      </form>
      <Modal open={confirmOpen} title="Confirm GhQR Payment" onClose={() => setConfirmOpen(false)} onConfirm={() => void confirm()}>
        Confirm this merchant payment?
      </Modal>
    </Card>
  )
}
