import mongoose from 'mongoose'

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

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

export { User }
