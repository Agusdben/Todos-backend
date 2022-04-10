import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

const loginRouter = express.Router()

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body
  if (!username) {
    return res.status(400).json({ error: 'Username required' })
  }
  if (!password) {
    return res.status(400).json({ error: 'Password required' })
  }

  try {
    const user = await User.findOne({ username: username.toLowerCase() })
    const validPassword = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if (!user || !validPassword) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }
    if (user) {
      const userForToken = user.toJSON()
      const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        {
          expiresIn: 60 * 60 * 24 * 30
        }
      )
      return res.send({ ...userForToken, token }).end()
    }
  } catch (e) { next(e) }
})

export { loginRouter }
