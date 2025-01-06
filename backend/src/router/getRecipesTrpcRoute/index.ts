import { recipes, trpc } from '../../lib'
import _ from 'lodash'

export const getRecipesTrpcRoute = trpc.procedure.query(() => {
  return {
    recipes: recipes.map((recipe) =>
      _.pick(recipe, ['name', 'description', 'id']),
    ),
  }
})
