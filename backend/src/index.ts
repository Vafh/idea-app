import express from 'express'
import cors from 'cors'
import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'
import { AppContext, createAppContext } from './lib'

void (async () => {
  let context: AppContext | null = null

  try {
    context = createAppContext()

    const expressApp = express()

    expressApp.use(cors())

    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })
    applyTrpcToExpressApp(expressApp, trpcRouter, context)

    expressApp.listen(3005, () => {
      console.info('Listening at http://localhost:3005')
    })
  } catch (error) {
    console.error(error)
    await context?.stop
  }
})()
