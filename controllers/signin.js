import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User.js'

const signinRouter = express.Router()

signinRouter.post('/', async (req, res, next) => {
  const { username, password, confirmPassword } = req.body

  if (!username || !password || !confirmPassword) {
    res.status(400).json({ error: 'Complete all fields' })
  }

  if (password !== confirmPassword) {
    res.status(400).json({ error: 'Password do not match' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    passwordHash,
    todos: []
  })

  try {
    const savedUser = await newUser.save()
    res.status(200).json(savedUser).end()
  } catch (e) { next(e) }
})

export { signinRouter }
