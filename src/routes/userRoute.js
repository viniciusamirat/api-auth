'use strict'

import express from 'express'
const router = express.Router()

import UserMiddleware from '../middlewares/userMiddleware.js'
import userController from '../controllers/userController.js'

router.get('/:id', UserMiddleware.checkJWT, userController.getUserById)

export default router