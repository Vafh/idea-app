import cors from 'cors'
import express from 'express'
import { AppContext, createAppContext, applyPassportToExpressApp } from './lib'
import { env } from './lib/env'
import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'

void (async () => {
  let context: AppContext | null = null

  try {
    context = createAppContext()

    const expressApp = express()

    expressApp.use(cors())

    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })
    applyPassportToExpressApp(expressApp, context)
    applyTrpcToExpressApp(expressApp, trpcRouter, context)

    expressApp.listen(env.PORT, () => {
      console.info(`Listening at http://localhost:${env.PORT}`)
    })
  } catch (error) {
    console.error(error)
    await context?.stop
  }
})()
