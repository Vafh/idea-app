import { trpc } from '../../lib'
import { validateCreateRecipeTrpcInput } from './input'

export const createRecipeTrpcRoute = trpc.procedure
  .input(validateCreateRecipeTrpcInput)
  .mutation(async ({ input, ctx }) => {
    if (!ctx.currentUser) {
      throw Error('UNAUTHORIZED')
    }
    const existingRecipe = await ctx.prisma.recipe.findUnique({
      where: { name: input.name },
    })
    if (existingRecipe) {
      throw new Error('Recipe already exists')
    }
    await ctx.prisma.recipe.create({
      data: { ...input, authorId: ctx.currentUser.id },
    })
    return true
  })
