import express from 'express'
import { Todo } from '../models/Todo.js'
import { User } from '../models/User.js'
import { userExtractor } from '../middleware/userExtractor.js'
const todosRouter = express.Router()

todosRouter.get('/:userID', userExtractor, async (req, res) => {
  const { userID } = req.params
  const todos = await Todo.find({ user: userID })
  res.json(todos).end()
})

todosRouter.post('/', userExtractor, async (req, res, next) => {
  const { description, username } = req.body
  if (!description) {
    res.status(400).json({ error: 'Please complete description field' })
  }

  const user = await User.findOne({ username })

  if (!user) {
    res.status(400).json({ error: 'User does not exist' })
  }

  const newTodo = new Todo({
    description,
    user: user._id
  })

  try {
    // save new todo...
    const savedTodo = await newTodo.save()
    // ...and update user document with it
    user.todos = user.todos.concat(savedTodo._id)
    await user.save()
    res.json(savedTodo).end()
  } catch (e) { next(e) }
})

todosRouter.put('/', userExtractor, async (req, res, next) => {
  const { todoID, description, done } = req.body

  const updatedTodo = {
    description,
    done
  }

  try {
    const todoUpdated = await Todo.findByIdAndUpdate(todoID, updatedTodo, { new: true })
    res.json(todoUpdated).end()
  } catch (e) { next(e) }
})

todosRouter.delete('/:todoID', userExtractor, async (req, res, next) => {
  const { todoID } = req.params

  try {
    // find index of user todo that be deleted
    const todo = await Todo.findById(todoID)
    const user = await User.findById(todo.user)
    const todosIDS = user.todos.map(todo => todo.toString())
    const index = todosIDS.indexOf(todoID)
    const todosUpdaete = user.todos.splice(index, 1)
    // update user without the todo
    const userUpdate = {
      ...user,
      todos: todosUpdaete
    }
    // finally update user and delte todo in data base
    await User.findByIdAndUpdate(user._id, userUpdate)
    await Todo.findByIdAndDelete(todoID)
    res.status(204).end()
  } catch (e) { next(e) }
})

export { todosRouter }
