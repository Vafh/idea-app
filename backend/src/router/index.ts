import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib'
import { createRecipeTrpcRoute } from './createRecipeTrpcRoute'
import getCurrentUser from './getCurrentUser'
import { getRecipeTrpcRoute } from './getRecipeTrpcRoute'
import { getRecipesTrpcRoute } from './getRecipesTrpcRoute'
import { signInTrpcRoute } from './signIn'
import { signUpTrpcRoute } from './signUp'
import { updateRecipeTrpcRoute } from './updateRecipe'
import { updateProfileTrpcRoute } from './updateProfile'
import { updatePasswordTrpcRoute } from './updatePassword'

export const trpcRouter = trpc.router({
  getRecipes: getRecipesTrpcRoute,
  getRecipe: getRecipeTrpcRoute,
  createRecipe: createRecipeTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  getCurrentUser,
  updateRecipe: updateRecipeTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
