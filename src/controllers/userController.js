'use strinct'

import fs from 'fs'

import userService from '../services/userService.js'

const userController = {

  createUser: async (req, res) => {
    const { name, email, password } = req.body

    const content = await userService.createUser(name, email, password)

    if (content.status === 'warn') {
      return res.status(400).json({message: content.message})
    } else if (content.status === 'success') {
      return res.status(201).json(content.content)
    } else {
      return res.status(500).json()
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body

    const content = await userService.login(email, password)

    if (content.status !== 'success') {
      return res.status(401).json({message: 'E-mail or password incorrect'})
    } else if (content.status === 'success') {
      return res.status(200).json(content.content)
    } else {
      return res.status(500).json()
    }
  },
  getUsers: async (req, res) => {
    const content = await userService.getUsers()

    if (content.status === 'warn') {
      return res.status(400).json({message: content.message})
    } else if (content.status === 'success') {
      return res.status(201).json(content.content)
    } else {
      return res.status(500).json()
    }
  },
  getUserById: async (req, res) => {
    const {id} = req.params
    console.log(id)
    const content = await userService.getUserById(id)

    if (content.status === 'warn') {
      return res.status(400).json({message: content.message})
    } else if (content.status === 'success') {
      return res.status(201).json(content.content)
    } else {
      return res.status(500).json()
    }
  },
  updateUserById: async (req, res) => {
    const {id} = req.params

    const { name, email } = req.body

    const user = {
      name,
      email
    }

    const content = await userService.updateUserById(id, user)

    if (content.status === 'warn') {
      return res.status(400).json({message: content.message})
    } else if (content.status === 'success') {
      return res.status(200).json(content.content)
    } else {
      return res.status(500).json()
    }
  },
  deleteUserById: async (req, res) => {
    const {id} = req.params

    const content = await userService.deleteUserById(id)

    if (content.status === 'warn') {
      return res.status(400).json({message: content.message})
    } else if (content.status === 'success') {
      return res.status(200).json(content.content)
    } else {
      return res.status(500).json()
    }
  }

}

export default userController