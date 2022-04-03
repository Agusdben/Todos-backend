import jwt from 'jsonwebtoken'

export const userExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = null
  let decodedToken = null

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
    decodedToken = jwt.verify(token, process.env.SECRET)
  }

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'Token missing or invalid' })
  }

  next()
}
