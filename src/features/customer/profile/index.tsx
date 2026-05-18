import { useQuery } from '@tanstack/react-query'
import { mockServer } from '../../../api/mockServer'
import Card from '../../../components/ui/Card'
import LoadingState from '../../../components/ui/LoadingState'

const ProfilePage = () => {
  const profileQuery = useQuery({ queryKey: ['customer-profile'], queryFn: () => mockServer.getCustomerProfile() })

  if (profileQuery.isLoading) {
    return <LoadingState message="Loading profile..." />
  }

  const profile = profileQuery.data?.data

  return (
    <Card title="Profile">
      <dl className="grid gap-2 text-sm">
        <div className="flex justify-between"><dt>Full Name</dt><dd>{profile?.fullName}</dd></div>
        <div className="flex justify-between"><dt>Email</dt><dd>{profile?.email}</dd></div>
        <div className="flex justify-between"><dt>Phone</dt><dd>{profile?.phone}</dd></div>
        <div className="flex justify-between"><dt>Ghana Card</dt><dd>{profile?.ghanaCardNumber}</dd></div>
        <div className="flex justify-between"><dt>Address</dt><dd>{profile?.address}</dd></div>
        <div className="flex justify-between"><dt>KYC Status</dt><dd>{profile?.kycStatus}</dd></div>
      </dl>
    </Card>
  )
}

export default ProfilePage
