import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { transferApi } from '../../../api/transferApi'
import { useAuthStore } from '../../../auth/authStore'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'

const schema = z.object({
  amount: z.coerce.number().positive(),
  agentCode: z.string().min(3),
  customerPhone: z.string().min(10),
  narration: z.string().min(2),
  pin: z.string().min(4).max(6),
})

type FormValues = z.input<typeof schema>

const CashServiceForm = ({ type }: { type: 'CASH_IN' | 'CASH_OUT' }) => {
  const userId = useAuthStore((state) => state.user?.id ?? 'cus-1')
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { narration: type === 'CASH_IN' ? 'Cash-in agent service' : 'Cash-out agent service' },
  })

  const mutation = useMutation({
    mutationFn: (payload: FormValues) =>
      transferApi.cashService(userId, {
        ...payload,
        amount: Number(payload.amount),
        type,
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
    <Card title={type === 'CASH_IN' ? 'Cash-In' : 'Cash-Out'}>
      <form className="grid gap-3" onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <Input label="Amount" type="number" step="0.01" {...register('amount')} error={errors.amount?.message} />
        <Input label="Agent code" {...register('agentCode')} error={errors.agentCode?.message} />
        <Input label="Customer phone" {...register('customerPhone')} error={errors.customerPhone?.message} />
        <Input label="Narration" {...register('narration')} error={errors.narration?.message} />
        <Input label="PIN" type="password" maxLength={6} {...register('pin')} error={errors.pin?.message} />
        <Button type="submit" disabled={isSubmitting || mutation.isPending}>Submit</Button>
      </form>
      {mutation.data?.data ? (
        <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
          Status: {mutation.data.data.status}
        </div>
      ) : null}
      <div className="mt-3 text-xs text-slate-500">Supported statuses: PENDING, SUCCESSFUL, FAILED, REVERSED.</div>
      <div className="mt-2">
        <Select label="Compliance consent" disabled>
          <option>Customer consent captured for cash service</option>
        </Select>
      </div>
    </Card>
  )
}

export const CashInPage = () => <CashServiceForm type="CASH_IN" />
export const CashOutPage = () => <CashServiceForm type="CASH_OUT" />
