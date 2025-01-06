import { trpc } from '../lib'
import { getRecipesTrpcRoute } from './getRecipesTrpcRoute'
import { getRecipeTrpcRoute } from './getRecipeTrpcRoute'

export const trpcRouter = trpc.router({
  getRecipes: getRecipesTrpcRoute,
  getRecipe: getRecipeTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
