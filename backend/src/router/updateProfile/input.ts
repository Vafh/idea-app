import { z } from 'zod'

export const zUpdateProfileTrpcInput = z.object({
  username: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9-]+$/,
      'User name may contain only lowercase letters, numbers and dashes',
    ),
})
