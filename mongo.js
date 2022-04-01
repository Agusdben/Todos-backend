import mongoose from 'mongoose'

const mongoConnect = () => {
  const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

  const connectionString = NODE_ENV === 'test'
    ? MONGO_DB_URI_TEST
    : MONGO_DB_URI

  mongoose.connect(connectionString)
    .then(() => {
      console.log('Database connected')
    }).catch(err => {
      console.error(err)
    })

  process.on('uncaughtException', () => {
    mongoose.disconnect()
  })
}

export { mongoConnect }
