import cors from 'cors'
import dotenv from 'dotenv'
import { mongoConnect } from './mongo.js'
import express from 'express'

dotenv.config()
mongoConnect()
const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3003

const server = app.listen(PORT, () => {
  console.log(`server on port ${PORT}`)
})

export { server }
