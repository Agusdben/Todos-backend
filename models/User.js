import mongoose from 'mongoose'
import { setDefaultFormat } from '../helpers/schemaFormat.js'
const Schema = mongoose.Schema
const model = mongoose.model

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }]
})

setDefaultFormat(userSchema)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

export { User }
