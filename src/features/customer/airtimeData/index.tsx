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
import Select from '../../../components/ui/Select'

const schema = z.object({
  network: z.string().min(2),
  merchantId: z.string().min(2),
  amount: z.coerce.number().positive(),
  narration: z.string().min(2),
  pin: z.string().min(4).max(6),
})

type FormValues = z.input<typeof schema>

const AirtimeDataPage = () => {
  const userId = useAuthStore((state) => state.user?.id ?? 'cus-1')
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { network: 'MTN', merchantId: 'AIRTIME', narration: 'Airtime/Data purchase' },
  })
  const mutation = useMutation({
    mutationFn: (payload: FormValues) =>
      paymentApi.buyAirtime(userId, {
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
    <Card title="Buy Airtime / Data">
      <form className="grid gap-3" onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <Select label="Network" {...register('network')}>
          <option>MTN</option>
          <option>Telecel</option>
          <option>AirtelTigo</option>
        </Select>
        <Input label="Phone number" {...register('merchantId')} error={errors.merchantId?.message} />
        <Input label="Amount" type="number" step="0.01" {...register('amount')} error={errors.amount?.message} />
        <Input label="Narration" {...register('narration')} error={errors.narration?.message} />
        <Input label="PIN" type="password" maxLength={6} {...register('pin')} error={errors.pin?.message} />
        <Button type="submit" disabled={isSubmitting || mutation.isPending}>Purchase</Button>
      </form>
    </Card>
  )
}

export default AirtimeDataPage
