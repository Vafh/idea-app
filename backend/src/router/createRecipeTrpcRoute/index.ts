import { recipes, trpc } from '../../lib'
import { validateCreateRecipeTrpcInput } from './input'

export const createRecipeTrpcRoute = trpc.procedure
  .input(validateCreateRecipeTrpcInput)
  .mutation(({ input }) => {
    recipes.unshift(input)
    return true
  })
