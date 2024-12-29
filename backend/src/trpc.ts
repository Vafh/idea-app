import { initTRPC } from '@trpc/server'

const recipes = [
  { name: 'Recipe name 1', description: 'Recipe description...', id: 1 },
  { name: 'Recipe name 2', description: 'Recipe description...', id: 2 },
  { name: 'Recipe name 3', description: 'Recipe description...', id: 3 },
]

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getRecipes: trpc.procedure.query(() => {
    return { recipes }
  }),
})

export type TrpcRouter = typeof trpcRouter
