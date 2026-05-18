import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { paymentApi } from '../../../api/paymentApi'
import { useAuthStore } from '../../../auth/authStore'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'

const schema = z.object({
  merchantId: z.string().min(3),
  amount: z.coerce.number().positive(),
  narration: z.string().min(2),
  pin: z.string().min(4).max(6),
})

type FormValues = z.input<typeof schema>

const GhqrPage = () => {
  const userId = useAuthStore((state) => state.user?.id ?? 'cus-1')
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { narration: 'GhQR merchant payment' },
  })

  const mutation = useMutation({
    mutationFn: (payload: FormValues) =>
      paymentApi.payGhQR(userId, {
        ...payload,
        amount: Number(payload.amount),
      }),
  })

  const onSubmit = async (values: FormValues): Promise<void> => {
    const response = await mutation.mutateAsync(values)
    if (!response.success || !response.data) {
      setError('pin', { message: response.message })
      return
    }
    navigate(`/receipt/${response.data.transactionId}`)
  }

  return (
    <Card title="Pay GhQR">
      <div className="mb-3 rounded-lg border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">QR scanner placeholder area</div>
      <form className="grid gap-3" onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <Input label="Merchant ID" {...register('merchantId')} error={errors.merchantId?.message} />
        <Input label="Amount" type="number" step="0.01" {...register('amount')} error={errors.amount?.message} />
        <Input label="Narration" {...register('narration')} error={errors.narration?.message} />
        <Input label="PIN" type="password" maxLength={6} {...register('pin')} error={errors.pin?.message} />
        <Button type="submit" disabled={isSubmitting || mutation.isPending}>Pay now</Button>
      </form>
    </Card>
  )
}

export default GhqrPage
