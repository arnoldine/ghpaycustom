import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { branding } from '../../../config/branding'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'
import { useAuth } from '../../../auth/useAuth'
import { loginSchema } from '../../../utils/validation'

const authCardClass = 'mx-auto mt-8 max-w-md'

type LoginValues = z.infer<typeof loginSchema>

const LoginForm = ({ adminOnly = false }: { adminOnly?: boolean }) => {
  const navigate = useNavigate()
  const { login, failedLoginAttempts } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: adminOnly ? 'admin@demo.com' : 'customer@demo.com',
      password: 'Password123!',
    },
  })

  const onSubmit = async (values: LoginValues): Promise<void> => {
    const result = await login(values.email, values.password)
    if (!result.success) {
      setError('password', { message: result.message })
      return
    }
    if (adminOnly) {
      navigate('/admin/dashboard')
      return
    }
    if (values.email.includes('admin') || values.email.includes('operations') || values.email.includes('compliance') || values.email.includes('support')) {
      navigate('/admin/dashboard')
      return
    }
    navigate('/dashboard')
  }

  return (
    <Card title={adminOnly ? 'Admin Login' : 'Customer Login'}>
      <form className="grid gap-3" onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
        {failedLoginAttempts > 0 ? (
          <p className="text-xs text-rose-700">Failed login attempts: {failedLoginAttempts}</p>
        ) : null}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </Card>
  )
}

export const LoginPage = () => (
  <div className={authCardClass}>
    <h1 className="mb-3 text-xl font-semibold text-slate-900">{branding.institutionName}</h1>
    <LoginForm />
    <p className="mt-3 text-sm text-slate-600">
      New user? <Link className="text-emerald-700" to="/register">Register</Link>
    </p>
  </div>
)

const registerSchema = z.object({
  fullName: z.string().min(3),
  phone: z.string().min(10),
  email: z.string().email(),
  password: z.string().min(8),
})

type RegisterValues = z.infer<typeof registerSchema>

export const RegisterPage = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  })

  return (
    <div className={authCardClass}>
      <Card title="Open GhanaPay Wallet">
        <form className="grid gap-3" onSubmit={(event) => void handleSubmit(() => navigate('/verify-otp'))(event)}>
          <Input label="Full name" {...register('fullName')} error={errors.fullName?.message} />
          <Input label="Phone" {...register('phone')} error={errors.phone?.message} />
          <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
          <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
          <Button type="submit" disabled={isSubmitting}>Continue to OTP</Button>
        </form>
      </Card>
    </div>
  )
}

export const VerifyOtpPage = () => {
  const navigate = useNavigate()
  return (
    <div className={authCardClass}>
      <Card title="OTP Verification">
        <p className="mb-3 text-sm text-slate-600">Enter OTP sent to your registered phone/email.</p>
        <Button onClick={() => navigate('/set-pin')}>Verify OTP</Button>
      </Card>
    </div>
  )
}

export const SetPinPage = () => {
  const navigate = useNavigate()
  return (
    <div className={authCardClass}>
      <Card title="Set transaction PIN">
        <p className="mb-3 text-sm text-slate-600">PIN is required for transfers, cash services, GhQR, airtime and bills.</p>
        <Button onClick={() => navigate('/login')}>Save PIN</Button>
      </Card>
    </div>
  )
}

export const AdminLoginPage = () => (
  <div className={authCardClass}>
    <h1 className="mb-3 text-xl font-semibold text-slate-900">Admin Portal</h1>
    <LoginForm adminOnly />
  </div>
)
