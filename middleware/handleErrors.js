export const handleErrors = (err, req, res, next) => {
  console.log(err)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({ error: 'Id does not exist' })
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ error: `Expected ${err.kind} valid` })
  }
  if (err.name === 'MongoServerError') {
    const keys = Object.keys(err.keyValue)
    return res.status(409).json({ error: `${keys.map(key => key + ', ')}already taken` })
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' })
  } else return res.status(500).end()
}
