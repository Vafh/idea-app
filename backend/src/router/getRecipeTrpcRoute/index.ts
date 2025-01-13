import { trpc } from '../../lib'
import { z } from 'zod'

export const getRecipeTrpcRoute = trpc.procedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {
    const recipe = await ctx.prisma.recipe.findUnique({
      where: { id: input.id },
    })
    return { recipe }
  })
