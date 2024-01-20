import express from 'express'
const router = express.Router()

import userController from '../controllers/userController.js'
import UserMiddleware from '../middlewares/userMiddleware.js'

router.post('/', UserMiddleware.validateCreateUser, userController.createUser)
router.post('/login', UserMiddleware.validateLogin, userController.login)
router.get('/', UserMiddleware.checkJWT, userController.getUsers)
router.get('/:id', UserMiddleware.checkJWT, userController.getUserById)
router.put('/:id', UserMiddleware.validateUpdateUser, UserMiddleware.checkJWT, userController.updateUserById)
router.delete('/:id', UserMiddleware.checkJWT, userController.deleteUserById)

export default router