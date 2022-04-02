export const setDefaultFormat = (schema) => {
  schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
}
