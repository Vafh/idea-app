import { trpc } from '../../lib'

export const getRecipesTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const recipes = await ctx.prisma.recipe.findMany({
    select: {
      name: true,
      description: true,
      id: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return { recipes }
})
