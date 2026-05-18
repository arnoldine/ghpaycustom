import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { transferApi } from '../../../api/transferApi'
import { useAuthStore } from '../../../auth/authStore'
import { usePinAttempts } from '../../../auth/useAuth'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'
import Modal from '../../../components/ui/Modal'
import Select from '../../../components/ui/Select'
import { transferSchema } from '../../../utils/validation'

type TransferFormValues = z.input<typeof transferSchema>

const TransferPage = () => {
  const userId = useAuthStore((state) => state.user?.id ?? 'cus-1')
  const setPinAttempts = usePinAttempts()
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)
  const [pendingForm, setPendingForm] = useState<TransferFormValues | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: { destinationType: 'GHANAPAY_WALLET', institutionOrNetwork: 'GhanaPay', narration: 'Wallet transfer' },
  })

  const mutation = useMutation({
    mutationFn: (payload: TransferFormValues) =>
      transferApi.createTransfer(userId, {
        ...payload,
        amount: Number(payload.amount),
      }),
  })

  const triggerConfirm = (values: TransferFormValues): void => {
    setPendingForm(values)
    setShowConfirm(true)
  }

  const submitTransfer = async (): Promise<void> => {
    if (!pendingForm) return
    const response = await mutation.mutateAsync(pendingForm)
    if (!response.success || !response.data) {
      const attemptMatch = response.message.match(/(\d+)$/)
      if (attemptMatch) {
        setPinAttempts(Number(attemptMatch[1]))
      }
      setError('pin', { message: response.message })
      setShowConfirm(false)
      return
    }
    setShowConfirm(false)
    navigate(`/receipt/${response.data.transactionId}`)
  }

  return (
    <div className="grid gap-4">
      <Card title="Send Money">
        <p className="mb-3 text-sm text-slate-600">Never share your PIN. PIN is only used to authorize this transfer.</p>
        <form className="grid gap-3" onSubmit={(event) => void handleSubmit(triggerConfirm)(event)}>
          <Select label="Destination Type" {...register('destinationType')}>
            <option value="GHANAPAY_WALLET">GhanaPay Wallet</option>
            <option value="BANK_ACCOUNT">Bank Account</option>
            <option value="MOBILE_MONEY">Mobile Money</option>
          </Select>
          <Input label="Recipient Name" {...register('recipientName')} error={errors.recipientName?.message} />
          <Input label="Recipient Account/Phone" {...register('recipientAccountOrPhone')} error={errors.recipientAccountOrPhone?.message} />
          <Input label="Institution/Network" {...register('institutionOrNetwork')} error={errors.institutionOrNetwork?.message} />
          <Input label="Amount" type="number" step="0.01" {...register('amount')} error={errors.amount?.message} />
          <Input label="Narration" {...register('narration')} error={errors.narration?.message} />
          <Input label="PIN" type="password" maxLength={6} {...register('pin')} error={errors.pin?.message} />
          <Button type="submit" disabled={isSubmitting || mutation.isPending}>Continue</Button>
        </form>
      </Card>
      <Modal open={showConfirm} title="Confirm transfer" onClose={() => setShowConfirm(false)} onConfirm={() => void submitTransfer()}>
        Please confirm beneficiary and amount before submitting. This transaction is auditable and will be visible in monitoring logs.
      </Modal>
    </div>
  )
}

export default TransferPage
