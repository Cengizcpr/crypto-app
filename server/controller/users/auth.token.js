import jwt from 'jsonwebtoken';

const tokenControl = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    return res.status(200).json({ message: 'Access granted', user: decoded });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export { tokenControl };
