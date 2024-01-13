import userModel from '../models/userModel.js'
import Result from '../utils/result.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const createUser = async (email, password) => {
  let result = new Result()

  try {

    const newEmail = email.trim().toLowerCase()
    
    const user = {
      email: newEmail,
      pass: password
    }

    const userContent = await getUserByEmail(newEmail)

    if (userContent.status !== 'success') {
      return userContent
    } else {
      
      if (userContent.content?.email) {
        result.setWarn('This e-mail already exist')
        return result.get()
      }
      
    }

    const createdContent = await userModel.create(user)

    const token = jwt.sign(
      {
      email: createdContent.email
      }, 
      process.env.JWT_SECRET, 
      {
        expiresIn: '1d'
      }
    )

    result.setSuccess({
      email: createdContent.email,
      password: createdContent.pass,
      token: token
    })
    return result.get()

  } catch (err) {
    console.log(`Error to create user: ${err}`)
    result.setError()
    return result.get()
  }
}

const getUserByEmail = async (email) => {
  let result = new Result()

  try{

    const newEmail = email.trim().toLowerCase()

    const content = await userModel.findOne({email: newEmail})

    result.setSuccess(content)
    return result.get()

  } catch (err) {
    console.log(`Error to create user: ${err}`)
    result.setError()
    return result.get()
  }
}

export default {
  createUser,
  getUserByEmail
}