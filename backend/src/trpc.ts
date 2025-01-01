import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import { z } from 'zod'

const recipes = _.times(100, (i) => ({
  name: `Recipe name ${i}`,
  description: `Recipe ${i} description...`,
  id: String(i),
  text: _.times(
    100,
    (j) => `<p>Some text in paragraph ${j} about recipe ${i}</p>`,
  ).join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getRecipes: trpc.procedure.query(() => {
    return {
      recipes: recipes.map((recipe) =>
        _.pick(recipe, ['name', 'description', 'id']),
      ),
    }
  }),
  getRecipe: trpc.procedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const recipe = recipes.find((recipe) => recipe.id === input.id)
      return { recipe: recipe || null }
    }),
})

export type TrpcRouter = typeof trpcRouter
