const jwt = require('jsonwebtoken');
const User = require('../model/user');

const protect = async (req, res, next) => {
  console.log(req.headers)
  const authHeader = req.headers.authorization;
  console.log('authheader',authHeader);
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, 'this-is-my-secret');

      console.log(decoded);
      const { id, role } = decoded;
      console.log(id, role);
      const user = await User.findById(id);
      console.log(user);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user;
      console.log(req.user);

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = protect;
