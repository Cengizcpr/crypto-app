import bcrypt from 'bcryptjs';
import db from '../../models/index.js';
const User = db.User;

const add = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    const resultUser = await User.findOne({ where: { username: user_name } });

    if (resultUser) {
      return res
        .status(400)
        .json({ message: 'User with the same user name already exists!' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createdUser = await User.create({
      username: user_name,
      email: email || null,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: 'User created successfully.',
      user: createdUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating user!',
      error: error.message,
    });
  }
};

export { add };
