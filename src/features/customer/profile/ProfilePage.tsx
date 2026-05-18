import { useQuery } from '@tanstack/react-query'
import { adminApi } from '../../../api/adminApi'
import { Card } from '../../../components/ui/Card'
import { useAuth } from '../../../auth/useAuth'
import { LoadingState } from '../../../components/ui/LoadingState'
import { maskGhanaCard, maskPhone } from '../../../utils/validation'

export const ProfilePage = () => {
  const { session } = useAuth()
  const customerId = session?.user.customerId ?? 'c1'
  const query = useQuery({ queryKey: ['profile', customerId], queryFn: () => adminApi.getCustomerProfile(customerId) })
  if (query.isLoading) return <LoadingState />
  const customer = query.data?.data
  if (!customer) return null
  return (
    <Card className="space-y-2">
      <h1 className="text-xl font-semibold">Profile</h1>
      <p>Name: {customer.fullName}</p>
      <p>Phone: {maskPhone(customer.phone)}</p>
      <p>Email: {customer.email}</p>
      <p>Ghana Card: {maskGhanaCard(customer.ghanaCard)}</p>
      <p>Address: {customer.address}</p>
    </Card>
  )
}
