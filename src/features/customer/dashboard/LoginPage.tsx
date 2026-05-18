import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAuth } from '../../../auth/AuthProvider'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormData = z.infer<typeof schema>

export const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { email: 'customer@demo.com', password: 'Password123!' } })

  const onSubmit = async (data: FormData) => {
    const result = await login(data)
    if (!result.success) {
      setError('root', { message: result.message })
      return
    }
    navigate(data.email.includes('customer') ? '/dashboard' : '/admin/dashboard')
  }

  return (
    <div className="mx-auto mt-10 max-w-md">
      <Card className="space-y-3">
        <h1 className="text-xl font-semibold">Customer Login</h1>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Email" {...register('email')} />
          <Input type="password" placeholder="Password" {...register('password')} />
          {(errors.email || errors.password || errors.root) && (
            <p className="text-sm text-red-600">{errors.email?.message || errors.password?.message || errors.root?.message}</p>
          )}
          <Button disabled={isSubmitting} type="submit" className="w-full">Sign In</Button>
        </form>
        <div className="flex justify-between text-sm">
          <Link to="/register" className="text-brand-primary">Register</Link>
          <Link to="/admin/login" className="text-brand-primary">Admin Login</Link>
        </div>
      </Card>
    </div>
  )
}
