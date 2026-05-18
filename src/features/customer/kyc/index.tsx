import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { kycApi } from '../../../api/kycApi'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'
import { kycSchema } from '../../../utils/validation'

type KycValues = z.infer<typeof kycSchema>

const KycPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<KycValues>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      fullName: 'Ama Mensah',
      dateOfBirth: '1995-02-15',
      ghanaCardNumber: 'GHA-123456789-1',
      phoneNumber: '+233241112223',
      address: 'Airport Residential, Accra',
      selfiePlaceholder: 'selfie.jpg',
      idImagePlaceholder: 'ghana-card-front.jpg',
      consentAccepted: false,
    },
  })
  const mutation = useMutation({ mutationFn: kycApi.submitKyc })

  return (
    <Card title="KYC Update">
      <p className="mb-3 text-xs text-slate-500">By submitting you consent to KYC verification and compliance checks.</p>
      <form className="grid gap-3" onSubmit={(event) => void handleSubmit((values) => mutation.mutate(values))(event)}>
        <Input label="Full Name" {...register('fullName')} error={errors.fullName?.message} />
        <Input label="Date of Birth" type="date" {...register('dateOfBirth')} error={errors.dateOfBirth?.message} />
        <Input label="Ghana Card Number" {...register('ghanaCardNumber')} error={errors.ghanaCardNumber?.message} />
        <Input label="Phone Number" {...register('phoneNumber')} error={errors.phoneNumber?.message} />
        <Input label="Address" {...register('address')} error={errors.address?.message} />
        <Input label="Selfie Placeholder" {...register('selfiePlaceholder')} error={errors.selfiePlaceholder?.message} />
        <Input label="ID Image Placeholder" {...register('idImagePlaceholder')} error={errors.idImagePlaceholder?.message} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('consentAccepted')} />
          I consent to KYC processing
        </label>
        {errors.consentAccepted ? <span className="text-xs text-rose-600">{errors.consentAccepted.message}</span> : null}
        <Button type="submit" disabled={isSubmitting || mutation.isPending}>Submit KYC</Button>
      </form>
      {mutation.data?.data ? <p className="mt-3 text-sm text-emerald-700">KYC status: {mutation.data.data.status}</p> : null}
    </Card>
  )
}

export default KycPage
