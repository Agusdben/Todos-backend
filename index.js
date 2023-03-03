import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import { mongoConnect } from './mongo.js'

import { todosRouter } from './controllers/todos.js'
import { signinRouter } from './controllers/signin.js'
import { loginRouter } from './controllers/login.js'
import { handleErrors } from './middleware/handleErrors.js'

dotenv.config()
mongoConnect()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/todos', todosRouter)

app.use('/api/signin', signinRouter)

app.use('/api/login', loginRouter)

app.use(handleErrors)

const PORT = process.env.PORT || 3003

const server = app.listen(PORT, () => {
  console.log(`server on port ${PORT}`)
})

export { server }
