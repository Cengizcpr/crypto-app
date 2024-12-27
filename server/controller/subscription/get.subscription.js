import db from '../../models/index.js';
import jwt from 'jsonwebtoken';

const getSubscriptions = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    const decoded = jwt.verify(token, 'secret');

    const email = decoded.email;

    const user = await db.User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user_id = user.dataValues.id;

    const subscriptions = await db.Subscription.findAll({
      where: { user_id },
      include: [
        {
          model: db.Coin,
          attributes: ['symbol', 'last_price', 'high_24h', 'low_24h'],
        },
      ],
    });

    if (!subscriptions || subscriptions.length === 0) {
      return res
        .status(404)
        .json({ message: 'No subscriptions found for this user' });
    }

    return res.status(200).json({
      message: 'User subscriptions retrieved successfully',
      subscriptions: subscriptions,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving subscriptions',
      error: error.message,
    });
  }
};

export { getSubscriptions };
