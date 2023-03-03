import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User.js'

const signinRouter = express.Router()

signinRouter.post('/', async (req, res, next) => {
  const { username, password, confirmPassword } = req.body

  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Complete all fields' })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Password do not match' })
  }

  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/

  if (!usernameRegex.test(username)) {
    return res.status(400).json({ error: 'Invalid username' })
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/

  if (!passwordRegex.test(password)) {
    return res.status(400).json({ error: 'Invalid password' })
  }

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
      username: username.toLowerCase(),
      passwordHash,
      todos: []
    })

    const savedUser = await newUser.save()
    return res.status(200).json(savedUser).end()
  } catch (e) { next(e) }
})

export { signinRouter }
