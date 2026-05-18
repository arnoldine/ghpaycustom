import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { kycApi } from '../../../api/kycApi'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import type { KycRequest } from '../../../types/kyc'

const schema = z.object({
  fullName: z.string().min(2),
  dateOfBirth: z.string().min(8),
  ghanaCardNumber: z.string().min(8),
  phoneNumber: z.string().min(10),
  address: z.string().min(4),
  selfiePlaceholder: z.string().min(2),
  idImagePlaceholder: z.string().min(2),
})

export const KycPage = () => {
  const mutation = useMutation({ mutationFn: kycApi.submitKyc })
  const { register, handleSubmit } = useForm<KycRequest>({ resolver: zodResolver(schema) })

  const submit = async (data: KycRequest) => {
    await mutation.mutateAsync(data)
  }

  return (
    <Card className="space-y-3">
      <h1 className="text-xl font-semibold">KYC Update</h1>
      <p className="text-xs text-slate-500">By submitting, you consent to storing identity and device information for regulatory compliance.</p>
      <form className="grid gap-3 md:grid-cols-2" onSubmit={handleSubmit(submit)}>
        <Input placeholder="Full name" {...register('fullName')} />
        <Input type="date" {...register('dateOfBirth')} />
        <Input placeholder="Ghana Card number" {...register('ghanaCardNumber')} />
        <Input placeholder="Phone number" {...register('phoneNumber')} />
        <Input placeholder="Address" {...register('address')} />
        <Input placeholder="Selfie placeholder" {...register('selfiePlaceholder')} />
        <Input placeholder="ID image placeholder" {...register('idImagePlaceholder')} />
        <Button type="submit" className="md:col-span-2">Submit KYC</Button>
      </form>
      {mutation.isSuccess && <Badge text="PENDING" tone="amber" />}
    </Card>
  )
}
