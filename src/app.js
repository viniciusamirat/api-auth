import express from 'express'
const app = express()
import 'express-async-errors'

import swagger from 'swagger-ui-express'
import swaggerJson from '../swagger.json' assert {type: 'json'}

app.use('/api/docs', swagger.serve, swagger.setup(swaggerJson))

import cors from 'cors'
app.use(cors())

app.use(express.json())

import conn from './configs/conn.js'
await conn()

import routes from './routes/routes.js'
app.use('/api', routes)


import Logger from './utils/logger.js'
const logger = new Logger()

app.use((error, req, res, next) => {
  logger.save(error)
  return res.sendStatus(500)
})

export default app