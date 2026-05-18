import { useNavigate } from 'react-router-dom'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'

export const SetPinPage = () => {
  const navigate = useNavigate()
  return (
    <div className="mx-auto mt-10 max-w-md">
      <Card className="space-y-3">
        <h1 className="text-xl font-semibold">Set Transaction PIN</h1>
        <Input type="password" maxLength={4} placeholder="PIN" />
        <Input type="password" maxLength={4} placeholder="Confirm PIN" />
        <Button className="w-full" onClick={() => navigate('/dashboard')}>Save PIN</Button>
      </Card>
    </div>
  )
}
