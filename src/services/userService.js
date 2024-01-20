'use strict'

import userModel from '../models/userModel.js'
import Result from '../utils/result.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const createUser = async (name, email, password) => {
  let result = new Result()

  try {

    const newEmail = email.trim().toLowerCase()
    const newName = name.trim().toLowerCase()

    const userContent = await getUserByEmail(newEmail)

    if (userContent.status !== 'success') {
      return userContent
    } else {
      
      if (userContent.content?.email) {
        result.setWarn('This e-mail already exist')
        return result.get()
      }
      
    }
  
    const salt = bcrypt.genSaltSync(12)
    const newPass = bcrypt.hashSync(password, salt)

    const user = {
      name: newName,
      email: newEmail,
      pass: newPass
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
      id: createdContent._id,
      name: createdContent.name,
      email: createdContent.email,
      token: token
    })
    return result.get()

  } catch (err) {
    result.setError()
    return result.get()
  }
}

const login = async (email, password) => {
  let result = new Result()

  try {
    
    const newEmail = email.trim().toLowerCase()

    const content = await getUserByEmail(newEmail)

    const userFromDB = content.content

    const allowed =  bcrypt.compareSync(password, userFromDB.pass)

    if (!allowed) {
      result.setError()
    } else {
      const token = await jwt.sign({email: newEmail}, process.env.JWT_SECRET, {expiresIn: '1d'})

      const user = {
        email: newEmail,
        token: token
      }

      result.setSuccess(user)
    }

    return result.get()

  } catch (err) {
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
    result.setError()
    return result.get()
  }
}

const getUserById = async (id) => {
  let result = new Result()

  try{

    const newId = id.trim()

    const content = await userModel.findById(newId)

    const user = {
      id: content._id,
      name: content.name,
      email: content.email,
    }

    result.setSuccess(user)
    return result.get()

  } catch (err) {
    result.setError()
    return result.get()
  }
}

const getUsers = async () => {
  let result = new Result()

  try{

    let users = []

    const content = await userModel.find()

    if (content) {
      users = content.map((item) => ({id: item._id, name: item?.name || '', email: item.email}))
    }

    result.setSuccess(users)
    return result.get()

  } catch (err) {
    result.setError()
    return result.get()
  }
}

const updateUserById = async (id, user) => {
  let result = new Result()

  try{

    let user = {}
    
    const newId = id.trim()

    const newUser = {
      name: user.name.trim().toLowerCase(),
      email: user.email.trim().toLowerCase()
    }

    const content = await userModel.findByIdAndUpdate(newId, newUser)

    if (content) {
      user = {
        id: content._id,
        name: content.name,
        email: content.email
      }
    }

    result.setSuccess(user)
    return result.get()

  } catch (err) {
    result.setError()
    return result.get()
  }
}

const deleteUserById = async (id) => {
  let result = new Result()

  try{

    let user = {}

    const newId = id.trim()

    const content = await userModel.findByIdAndDelete(newId)

    if (content) {
      user = {
        id: content._id,
        name: content.name,
        email: content.email
      }
    }

    result.setSuccess(user)
    return result.get()

  } catch (err) {
    result.setError()
    return result.get()
  }
}

export default {
  createUser,
  login,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById
}