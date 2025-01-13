import { TrpcRouter } from '../router'
import { initTRPC } from '@trpc/server'
import { type Express } from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { AppContext } from './context'
import SuperJSON from 'superjson'

export const trpc = initTRPC.context<AppContext>().create({
  transformer: SuperJSON,
})

export const applyTrpcToExpressApp = (
  expressApp: Express,
  trpcRouter: TrpcRouter,
  appContext: AppContext,
) =>
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appContext,
    }),
  )
