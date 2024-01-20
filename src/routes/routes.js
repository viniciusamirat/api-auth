import express from 'express'
const router = express.Router()

import userRouter from './userRoute.js'
router.use('/user', userRouter)

import usersRoute from './usersRoute.js'
router.use('/users', usersRoute)

export default router