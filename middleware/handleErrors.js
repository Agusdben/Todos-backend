export const handleErrors = (err, req, res) => {
  console.log(err)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    res.status(400).json({ error: 'Id does not exist' })
  }
  if (err.name === 'CastError') {
    res.status(400).json({ error: `Expected ${err.kind} but recived ${err.valueType}` })
  }
  if (err.name === 'MongoServerError') {
    const keys = Object.keys(err.keyValue)
    res.status(409).json({ error: `${keys.map(item => item + ', ')}already taken` })
  } else res.status(500).end()
}
