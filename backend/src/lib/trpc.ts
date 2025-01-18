import { TrpcRouter } from '../router'
import { initTRPC, type inferAsyncReturnType } from '@trpc/server'

import { type Express } from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { AppContext } from './context'
import SuperJSON from 'superjson'
import { ExpressRequest } from '../utils/types'

const getCreateTrpcContext =
  (appContext: AppContext) =>
  ({ req }: trpcExpress.CreateExpressContextOptions) => ({
    ...appContext,
    currentUser: (req as ExpressRequest).user || null,
  })

type TrpcContext = inferAsyncReturnType<ReturnType<typeof getCreateTrpcContext>>

export const trpc = initTRPC.context<TrpcContext>().create({
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
      createContext: getCreateTrpcContext(appContext),
    }),
  )
