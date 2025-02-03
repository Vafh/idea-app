import { trpc } from '../../lib'
import { validateGetRecipesTrpcRouteInput } from './input'

export const getRecipesTrpcRoute = trpc.procedure
  .input(validateGetRecipesTrpcRouteInput)
  .query(async ({ ctx, input }) => {
    const recipes = await ctx.prisma.recipe.findMany({
      select: {
        name: true,
        description: true,
        id: true,
        createdAt: true,
        serialNumber: true,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          serialNumber: 'desc',
        },
      ],
      cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
      take: input.limit + 1,
    })

    const nextRecipe = recipes.at(input.limit)
    const nextCursor = nextRecipe?.serialNumber
    const recipesExceptNext = recipes.slice(0, input.limit)

    return { recipes: recipesExceptNext, nextCursor }
  })
