import express from 'express'
import cors from 'cors'
import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'

const expressApp = express()

expressApp.use(cors())

expressApp.get('/ping', (req, res) => {
  res.send('pong')
})
applyTrpcToExpressApp(expressApp, trpcRouter)

expressApp.listen(3005, () => {
  console.info('Listening at http://localhost:3005')
})
