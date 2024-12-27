
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { log } from 'mercedlogger';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectToWebSockets } from './services/coin.service.js';
import db from './models/index.js';
import http from 'http';
import { Server as socketIo } from 'socket.io';

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = new socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',

    credentials: true,
  })
);

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');

    db.sequelize
      .sync()
      .then(() => {
        console.log('Synced db.');
      })
      .catch((err) => {
        console.log('Failed to sync db: ' + err);
      });
  })
  .catch((err) => {
    console.log('Unable to connect to the database: ' + err);
  });

io.on('connection', (socket) => {
  console.log('A user connected');

  const intervalId = setInterval(async () => {
    try {
      const data = await db.Coin.findAll({
        order: [['id', 'ASC']],
      });

      socket.emit('data', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, 5000);

  socket.on('disconnect', () => {
    console.log('User disconnected');
    clearInterval(intervalId);
  });
});
connectToWebSockets();
import usersRouter from './router/user.route.js';
import subscriptionRouter from './router/subscription.route.js';

app.use('/users', usersRouter);
app.use('/subscription', subscriptionRouter);

server.listen(port, () => log.green('Server is running on port', port));

export default app;
