import { z } from 'zod'

export const validateCreateRecipeTrpcInput = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Description is required'),
  text: z.string().nonempty('Text is required').min(10, {
    message: 'Text should be at least 10 characters long',
  }),
  id: z.string(),
})
