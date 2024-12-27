import WebSocket from 'ws';
import db from '../models/index.js';

import fs from 'fs';
const Coin = db.Coin;

let coins = JSON.parse(fs.readFileSync('./data/crypto-symbol.json', 'utf8'));
let coinData = {};

const connectToWebSockets = () => {
  coins.forEach((coin) => {
    const ws = new WebSocket(
      `wss://stream.binance.com:443/ws/${coin.name.toLowerCase()}@trade`
    );

    ws.on('message', (data) => {
      const parsedData = JSON.parse(data);

      const coin = parsedData.s;
      const lastPrice = parseFloat(parsedData.p);
      const priceChange = parseFloat(parsedData.P);
      const priceChangePercent = parseFloat(parsedData.P);

      coinData[coin] = {
        last_price: lastPrice,
        price_change_24h: priceChange,
        price_change_percent_24h: priceChangePercent,
      };
    });
  });
};

const updateDatabase = async () => {
  try {
    for (const [coin, data] of Object.entries(coinData)) {
      const { last_price } = data;

      await Coin.upsert({
        symbol: coin,
        last_price: last_price,
        high_24h: last_price,
        low_24h: last_price,
      });
    }
    console.log('Database updated at', new Date().toLocaleTimeString());
  } catch (error) {
    console.error('Error updating database:', error);
  }
};

setInterval(updateDatabase, 20000);

export { connectToWebSockets };
