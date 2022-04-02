import mongoose from 'mongoose'
import { setDefaultFormat } from '../helpers/schemaFormat.js'
const Schema = mongoose.Schema
const model = mongoose.model

const todoSchema = new Schema({
  description: {
    type: String,
    require: true
  },
  important: {
    type: Boolean,
    default: false
  },
  done: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  }
})

setDefaultFormat(todoSchema)

const Todo = model('Todo', todoSchema)

export { Todo }
