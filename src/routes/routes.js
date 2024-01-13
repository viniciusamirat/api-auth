import express from 'express'
const router = express.Router()

import userRoute from './userRoute.js'
router.use('/users', userRoute)

export default router