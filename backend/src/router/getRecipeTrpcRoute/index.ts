import { z } from 'zod'
import { trpc } from '../../lib'

export const getRecipeTrpcRoute = trpc.procedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {
    const recipe = await ctx.prisma.recipe.findUnique({
      where: { id: input.id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    })
    return { recipe }
  })
