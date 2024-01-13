import userService from '../services/userService.js'

const userController = {

  createUser: async (req, res) => {
    const { email, password } = req.body

    const content = await userService.createUser(email, password)

    if (content.status === 'warn') {
      return res.status(400).json({message: content.message})
    } else if (content.status === 'success') {
      return res.status(201).json(content.content)
    } else {
      return res.status(500).json()
    }

  }

}

export default userController