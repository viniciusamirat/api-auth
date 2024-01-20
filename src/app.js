import express from 'express'
const app = express()

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

export default app