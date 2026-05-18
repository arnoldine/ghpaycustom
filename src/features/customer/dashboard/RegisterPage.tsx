import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'

export const RegisterPage = () => {
  const navigate = useNavigate()
  return (
    <div className="mx-auto mt-10 max-w-md">
      <Card className="space-y-3">
        <h1 className="text-xl font-semibold">Register Account</h1>
        <Input placeholder="Full name" />
        <Input placeholder="Phone number" />
        <Input placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button className="w-full" onClick={() => navigate('/verify-otp')}>Continue</Button>
        <p className="text-xs text-slate-500">By continuing, you consent to KYC and device-linking checks.</p>
        <Link to="/login" className="text-sm text-brand-primary">Back to login</Link>
      </Card>
    </div>
  )
}
