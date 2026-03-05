const jwt = require('jsonwebtoken')

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET environment variable is required in production')
    }
    console.warn('⚠️  JWT_SECRET not set — using insecure default. Set JWT_SECRET before deploying.')
    return 'dev_only_secret_change_before_deploy'
  }
  return secret
}

module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' })
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret())
    req.user = decoded
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' })
  }
}
