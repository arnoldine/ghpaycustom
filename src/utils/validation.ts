import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const transferSchema = z.object({
  destinationType: z.enum(['GHANAPAY_WALLET', 'BANK_ACCOUNT', 'MOBILE_MONEY']),
  recipientName: z.string().min(2),
  recipientAccountOrPhone: z.string().min(8),
  institutionOrNetwork: z.string().min(2),
  amount: z.coerce.number().positive(),
  narration: z.string().min(2),
  pin: z.string().min(4).max(6),
})

export const kycSchema = z.object({
  fullName: z.string().min(3),
  dateOfBirth: z.string().min(1),
  ghanaCardNumber: z.string().regex(/^GHA-\d{9}-\d$/),
  phoneNumber: z.string().min(10),
  address: z.string().min(5),
  selfiePlaceholder: z.string().min(1),
  idImagePlaceholder: z.string().min(1),
  consentAccepted: z.boolean().refine((value) => value, 'Consent is required'),
})
