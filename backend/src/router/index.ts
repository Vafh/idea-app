import { trpc } from '../lib'
import { createRecipeTrpcRoute } from './createRecipeTrpcRoute'
import getCurrentUser from './getCurrentUser'
import { getRecipeTrpcRoute } from './getRecipeTrpcRoute'
import { getRecipesTrpcRoute } from './getRecipesTrpcRoute'
import { signInTrpcRoute } from './signIn'
import { signUpTrpcRoute } from './signUp'

export const trpcRouter = trpc.router({
  getRecipes: getRecipesTrpcRoute,
  getRecipe: getRecipeTrpcRoute,
  createRecipe: createRecipeTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  getCurrentUser,
})

export type TrpcRouter = typeof trpcRouter
