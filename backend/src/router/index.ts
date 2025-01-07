import { trpc } from '../lib'
import { getRecipesTrpcRoute } from './getRecipesTrpcRoute'
import { getRecipeTrpcRoute } from './getRecipeTrpcRoute'
import { createRecipeTrpcRoute } from './createRecipeTrpcRoute'

export const trpcRouter = trpc.router({
  getRecipes: getRecipesTrpcRoute,
  getRecipe: getRecipeTrpcRoute,
  createRecipe: createRecipeTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
