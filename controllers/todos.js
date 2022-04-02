import express from 'express'
import { Todo } from '../models/Todo.js'
import { User } from '../models/User.js'

const todosRouter = express.Router()

todosRouter.get('/:userID', async (req, res) => {
  const { userID } = req.params
  const todos = await Todo.find({ user: userID })
  res.json(todos)
})

todosRouter.post('/', async (req, res) => {
  const { description, important = false, username } = req.body

  if (!description) {
    res.status(400).json({ error: 'Please complete description field' })
  }

  const user = await User.findOne({ username })

  if (!user) {
    res.status(400).json({ error: 'User does not exist' })
  }

  const newTodo = new Todo({
    description,
    important,
    user: user._id
  })

  try {
    // save new todo...
    const savedTodo = await newTodo.save()
    // ...and update user document with it
    user.todos = user.todos.concat(savedTodo._id)
    await user.save()
    res.status(200).end()
  } catch (e) { console.log(e) }
})

todosRouter.put('/', async (req, res, next) => {
  const { todoID, description, important, done } = req.body

  const updatedTodo = {
    description,
    important,
    done
  }

  try {
    const todoUpdated = await Todo.findByIdAndUpdate(todoID, updatedTodo, { new: true })
    res.json(todoUpdated)
  } catch (e) { next(e) }
})

todosRouter.delete('/:todoID', async (req, res) => {

})

export { todosRouter }
