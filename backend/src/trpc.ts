import { initTRPC } from '@trpc/server'
import _ from 'lodash'

const recipes = _.times(100, (i) => ({
  name: `Recipe name ${i}`,
  description: `Recipe ${i} description...`,
  id: i,
  text: _.times(100, () => `<p>Some text about recipe ${i}</p>`).join(''),
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
})

export type TrpcRouter = typeof trpcRouter
