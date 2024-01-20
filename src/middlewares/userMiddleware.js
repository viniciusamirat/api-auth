'use strinct'

import dotenv from 'dotenv'
dotenv.config()

import jwt from 'jsonwebtoken'

const emailRegex = /^([a-z0-9\.\-\_]{2,})@([a-z0-9]{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/

class UserMiddleware {

  async checkJWT(req, res, next) {
    try {

      const [, token] = req.headers.authorization.split(' ')

      if (!token) {
        return res.sendStatus(401)
      }

      await jwt.verify(token, process.env.JWT_SECRET)

      return next()
    } catch (err) {
      return res.sendStatus(401)
    }
  }

  validateCreateUser(req, res, next) {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({message: "Invalid fields"})
    }

    const newName = name.toString().trim().toLowerCase()
    const newEmail = email.toString().trim().toLowerCase()

    if (newName.length < 3) return res.status(400).json({message: "Name must have more than 2 characters"})
    if (!emailRegex.test(newEmail)) return res.status(400).json({message: "This e-mail is not valid"})
    if (password.length < 8) return res.status(400).json({message: "The password must have more than 7 charactres"})

    return next()
  }

  validateUpdateUser(req, res, next) {
    const { name, email } = req.body

    if (!name || !email) {
      return res.status(400).json({message: "Invalid fields"})
    }

    const newName = name.toString().trim().toLowerCase()
    const newEmail = email.toString().trim().toLowerCase()

    if (newName.length < 3) return res.status(400).json({message: "Name must have more than 2 characters"})
    if (!emailRegex.test(newEmail)) return res.status(400).json({message: "This e-mail is not valid"})

    return next()
  }

  validateLogin(req, res, next) {
    const { email, password} = req.body

    if (!email || !password) {
      return res.status(400).json({message: "Invalid fields"})
    }

    const newEmail = email.toString().trim().toLowerCase()

    if (!emailRegex.test(newEmail)) return res.status(400).json({message: "This e-mail is not valid"})

    return next()
  }
}

export default new UserMiddleware()