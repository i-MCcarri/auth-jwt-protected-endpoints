const { API_TOKEN } = require('../config')

const basicAuth = (req, res, next) => {
  const authToken = req.get('Authorization') || ''

  if (!authToken) {
    return res.status(400).json({ message: 'Bad request' })
  }

  let basicToken

  if (!authToken.toLowerCase().startsWith('basic ')) {
    return res.status(400).json({ error: 'Missing basic token' })
  } else {
    basicToken = authToken.split(' ')[1]
  }

  const [tokenUserName, tokenPassword] = Buffer.from(basicToken, 'base64')
    .toString()
    .split(':')

  if (!tokenUserName || !tokenPassword) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }

  next()
}

module.exports = basicAuth
