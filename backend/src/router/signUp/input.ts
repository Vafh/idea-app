import { z } from 'zod'

export const validateSignUpTrpcInput = z.object({
  username: z
    .string()
    .min(1)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores',
    ),
  password: z.string().min(1),
})
