import { trpc } from '../../lib'
import { validateUpdateRecipeTrpcInput } from './input'

export const updateRecipeTrpcRoute = trpc.procedure
  .input(validateUpdateRecipeTrpcInput)
  .mutation(async ({ input, ctx }) => {
    const { recipeId, ...recipeInput } = input

    if (!ctx.currentUser) {
      throw Error('UNAUTHORIZED')
    }
    const recipe = await ctx.prisma.recipe.findUnique({
      where: { id: recipeId },
    })
    if (!recipe) {
      throw new Error('NOT_FOUND')
    }
    if (ctx.currentUser.id !== recipe.authorId) {
      throw new Error('NOT_YOUR_IDEA')
    }
    await ctx.prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        ...recipeInput,
      },
    })
    return true
  })
