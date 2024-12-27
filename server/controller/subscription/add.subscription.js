import db from '../../models/index.js';
import jwt from 'jsonwebtoken';

const Subscription = db.Subscription;
const User = db.User;
const Coin = db.Coin;

const add = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    const decoded = jwt.verify(token, 'secret');

    const email = decoded.email;
    const { coin_id } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user_id = user.dataValues.id;

    const coin = await Coin.findByPk(coin_id);
    if (!coin) {
      return res.status(404).json({ message: 'Coin not found' });
    }

    const existingSubscription = await Subscription.findOne({
      where: { user_id, coin_id },
    });
    if (existingSubscription) {
      return res
        .status(400)
        .json({ message: 'User is already subscribed to this coin' });
    }

    const newSubscription = await Subscription.create({
      user_id,
      coin_id,
    });

    return res.status(200).json({
      message: 'Subscription added successfully',
      subscription: newSubscription,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error adding subscription',
      error: error.message,
    });
  }
};

export { add };
