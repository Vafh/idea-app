import { z } from 'zod'
import { validateCreateRecipeTrpcInput } from '../createRecipeTrpcRoute/input'

export const validateUpdateRecipeTrpcInput =
  validateCreateRecipeTrpcInput.extend({
    recipeId: z.string().min(1),
  })
