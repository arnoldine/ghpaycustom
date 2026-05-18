import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { paymentApi } from '../../../api/paymentApi'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import type { PaymentRequest } from '../../../types/transaction'

const schema = z.object({
  biller: z.string().min(2),
  amount: z.coerce.number().positive(),
  narration: z.string().min(2),
  pin: z.string().length(4),
})

export const BillsPage = () => {
  const navigate = useNavigate()
  const mutation = useMutation({ mutationFn: paymentApi.payBill })
  const { register, handleSubmit } = useForm<PaymentRequest>({ resolver: zodResolver(schema), defaultValues: { narration: 'Bill payment' } })

  const submit = async (data: PaymentRequest) => {
    const response = await mutation.mutateAsync(data)
    if (response.success && response.data) navigate(`/receipt/${response.data.id}`)
  }

  return (
    <Card className="space-y-3">
      <h1 className="text-xl font-semibold">Bill Payment</h1>
      <form className="grid gap-3 md:grid-cols-2" onSubmit={handleSubmit(submit)}>
        <Select {...register('biller')}>
          <option value="">Select biller</option>
          <option value="ECG">ECG</option>
          <option value="GhanaWater">Ghana Water</option>
          <option value="DSTV">DSTV</option>
        </Select>
        <Input type="number" placeholder="Amount" {...register('amount')} />
        <Input placeholder="Narration" {...register('narration')} />
        <Input type="password" maxLength={4} placeholder="PIN" {...register('pin')} />
        <Button type="submit" className="md:col-span-2">Pay Bill</Button>
      </form>
    </Card>
  )
}
