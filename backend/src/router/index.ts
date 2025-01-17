import { trpc } from '../lib'
import { getRecipesTrpcRoute } from './getRecipesTrpcRoute'
import { getRecipeTrpcRoute } from './getRecipeTrpcRoute'
import { createRecipeTrpcRoute } from './createRecipeTrpcRoute'
import { signUpTrpcRoute } from './signUp'
import { signInTrpcRoute } from './signIn'

export const trpcRouter = trpc.router({
  getRecipes: getRecipesTrpcRoute,
  getRecipe: getRecipeTrpcRoute,
  createRecipe: createRecipeTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
