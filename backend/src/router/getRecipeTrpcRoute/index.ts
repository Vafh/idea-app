import { recipes, trpc } from '../../lib'
import { z } from 'zod'

export const getRecipeTrpcRoute = trpc.procedure
  .input(z.object({ id: z.string() }))
  .query(({ input }) => {
    const recipe = recipes.find((recipe) => recipe.id === input.id)
    return { recipe: recipe || null }
  })
