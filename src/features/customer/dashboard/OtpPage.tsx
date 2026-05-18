import { useNavigate } from 'react-router-dom'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'

export const OtpPage = () => {
  const navigate = useNavigate()
  return (
    <div className="mx-auto mt-10 max-w-md">
      <Card className="space-y-3">
        <h1 className="text-xl font-semibold">OTP Verification</h1>
        <Input placeholder="Enter 6-digit OTP" />
        <Button className="w-full" onClick={() => navigate('/set-pin')}>Verify OTP</Button>
      </Card>
    </div>
  )
}
