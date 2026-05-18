import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAuth } from '../../../auth/useAuth'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormData = z.infer<typeof schema>

export const AdminLoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { email: 'admin@demo.com', password: 'Password123!' } })

  const submit = async (data: FormData) => {
    const result = await login(data)
    if (!result.success) {
      setError('root', { message: result.message })
      return
    }
    navigate('/admin/dashboard')
  }

  return (
    <div className="mx-auto mt-10 max-w-md">
      <Card className="space-y-3">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <form className="space-y-3" onSubmit={handleSubmit(submit)}>
          <Input placeholder="Admin email" {...register('email')} />
          <Input type="password" placeholder="Password" {...register('password')} />
          {(errors.email || errors.password || errors.root) && <p className="text-sm text-red-600">{errors.email?.message || errors.password?.message || errors.root?.message}</p>}
          <Button className="w-full" type="submit">Sign In</Button>
        </form>
        <Link to="/login" className="text-sm text-brand-primary">Customer Login</Link>
      </Card>
    </div>
  )
}
