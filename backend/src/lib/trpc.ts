import { TrpcRouter } from '../router'
import { initTRPC } from '@trpc/server'
import { type Express } from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { AppContext } from './context'

export const trpc = initTRPC.context<AppContext>().create()

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
