import { trpc } from '../../lib'
import { validateCreateRecipeTrpcInput } from './input'

export const createRecipeTrpcRoute = trpc.procedure
  .input(validateCreateRecipeTrpcInput)
  .mutation(async ({ input, ctx }) => {
    const existingRecipe = await ctx.prisma.recipe.findUnique({
      where: { id: input.id },
    })
    if (existingRecipe) {
      throw new Error('Recipe already exists')
    }
    await ctx.prisma.recipe.create({
      data: input,
    })
    return true
  })
