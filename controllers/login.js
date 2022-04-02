import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  if (!username) {
    return res.status(400).json({ error: 'Username required' })
  }
  if (!password) {
    return res.status(400).json({ error: 'Password required' })
  }

  const user = await User.findOne({ username }).populate('todos', {
    description: 1,
    important: 1,
    done: 1
  })
  const validPassword = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!user || !validPassword) {
    res.status(401).json({ error: 'Invalid username or password' })
  }

  const userForToken = user.toJSON()
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    {
      expiresIn: 60 * 60 * 24 * 30
    }
  )

  res.send({ ...userForToken, token })
})

export { loginRouter }
