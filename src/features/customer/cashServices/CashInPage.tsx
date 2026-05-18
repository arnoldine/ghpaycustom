import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { transferApi } from '../../../api/transferApi'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'

type FormData = z.input<typeof schema>
type FormOutput = z.output<typeof schema>

const schema = z.object({
  amount: z.coerce.number().positive(),
  agentCode: z.string().min(3),
  customerPhone: z.string().min(10),
  narration: z.string().min(2),
  pin: z.string().length(4),
})

export const CashInPage = () => {
  const [status, setStatus] = useState<string>('')
  const mutation = useMutation({ mutationFn: transferApi.cashIn })
  const { register, handleSubmit, formState: { errors } } = useForm<FormData, unknown, FormOutput>({ resolver: zodResolver(schema) })

  const submit = async (data: FormOutput) => {
    const response = await mutation.mutateAsync(data)
    setStatus(response.data?.status ?? '')
  }

  return (
    <Card className="space-y-3">
      <h1 className="text-xl font-semibold">Cash-In</h1>
      <form className="grid gap-3 md:grid-cols-2" onSubmit={handleSubmit(submit)}>
        <Input type="number" placeholder="Amount" {...register('amount')} />
        <Input placeholder="Agent code" {...register('agentCode')} />
        <Input placeholder="Customer phone" {...register('customerPhone')} />
        <Input placeholder="Narration" {...register('narration')} />
        <Input type="password" maxLength={4} placeholder="PIN" {...register('pin')} />
        <Button type="submit">Submit Cash-In</Button>
      </form>
      {Object.values(errors)[0]?.message && <p className="text-sm text-red-600">{Object.values(errors)[0]?.message as string}</p>}
      {status && <Badge text={status} tone={status === 'SUCCESSFUL' ? 'green' : status === 'PENDING' ? 'amber' : 'red'} />}
    </Card>
  )
}
