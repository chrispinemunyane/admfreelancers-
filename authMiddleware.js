const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (requiredRole = 'user') => async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check role authorization
    if (requiredRole !== 'user' && req.user.role !== requiredRole) {
      return res.status(403).json({ msg: 'Permission denied' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
