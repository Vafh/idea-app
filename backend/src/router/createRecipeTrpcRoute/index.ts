import { recipes, trpc } from '../../lib'
import { validateCreateRecipeTrpcInput } from './input'

export const createRecipeTrpcRoute = trpc.procedure
  .input(validateCreateRecipeTrpcInput)
  .mutation(({ input }) => {
    if (recipes.find((recipe) => recipe.id === input.id)) {
      throw new Error('Recipe already exists')
    }
    recipes.unshift(input)
    return true
  })
