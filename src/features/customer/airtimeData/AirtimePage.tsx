import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { paymentApi } from '../../../api/paymentApi'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
type FormData = z.input<typeof schema>
type FormOutput = z.output<typeof schema>

const schema = z.object({
  phone: z.string().min(10),
  amount: z.coerce.number().positive(),
  narration: z.string().min(2),
  pin: z.string().length(4),
})

export const AirtimePage = () => {
  const navigate = useNavigate()
  const mutation = useMutation({ mutationFn: paymentApi.buyAirtime })
  const { register, handleSubmit } = useForm<FormData, unknown, FormOutput>({ resolver: zodResolver(schema), defaultValues: { narration: 'Airtime purchase' } })

  const submit = async (data: FormOutput) => {
    const response = await mutation.mutateAsync(data)
    if (response.success && response.data) navigate(`/receipt/${response.data.id}`)
  }

  return (
    <Card className="space-y-3">
      <h1 className="text-xl font-semibold">Buy Airtime / Data</h1>
      <form className="grid gap-3 md:grid-cols-2" onSubmit={handleSubmit(submit)}>
        <Input placeholder="Phone number" {...register('phone')} />
        <Input type="number" placeholder="Amount" {...register('amount')} />
        <Input placeholder="Narration" {...register('narration')} />
        <Input type="password" maxLength={4} placeholder="PIN" {...register('pin')} />
        <Button type="submit" className="md:col-span-2">Purchase</Button>
      </form>
    </Card>
  )
}
