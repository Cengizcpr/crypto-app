
'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Cookie from 'js-cookie';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribedCoins, setSubscribedCoins] = useState([]);
  const [filter, setFilter] = useState('');
  const [token, setToken] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(null); 

  useEffect(() => {
    const token = Cookie.get('token');
    setToken(token);

    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/subscription/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const subscriptions = response.data.subscriptions;
          setSubscribedCoins(subscriptions.map((sub) => sub.coin.symbol));
        }
      } catch (err) {
        console.log('Error fetching subscriptions', err);
      }
    };

    fetchSubscriptions();
    const socket = io('http://localhost:5000');

    socket.on('data', (newData) => {
      setData(newData);
      setLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  };

  const subscribeToCoin = async (coinId, symbol) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/subscription/',
        {
          coin_id: coinId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSubscribedCoins((prevSubscribedCoins) => [
          ...prevSubscribedCoins,
          symbol,
        ]);
      }
    } catch (err) {
      console.error('Error subscribing to coin', err);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSelectCoin = (coin) => {
    setSelectedCoin(coin);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredCoins = data.filter((coin) =>
    coin.symbol.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Real-time Crypto Data</h2>

      <div className="mb-3">
        <label>Filter Crypto Symbol : </label>
        <input
          type="text"
          className="form-control"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search symbol"
        />
      </div>

      <h3>Subscribed Coins</h3>
      <ul>
        {subscribedCoins.length === 0 ? (
          <p>No subscriptions yet.</p>
        ) : (
          subscribedCoins.map((coin, index) => <li key={index}>{coin}</li>)
        )}
      </ul>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Price(24h High)</th>
            <th>Price(24h Low)</th>
            <th>Updated At</th>
            <th>Subscribe</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No data found.
              </td>
            </tr>
          ) : (
            filteredCoins.map((coin, index) => (
              <tr key={index} onClick={() => handleSelectCoin(coin)}>
                <td>{++index}</td>
                <td>{coin.symbol}</td>
                <td>{coin.last_price}</td>
                <td>{coin.high_24h}</td>
                <td>{coin.low_24h}</td>
                <td>{formatDate(coin.updatedAt)}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => subscribeToCoin(coin.id, coin.symbol)}
                    disabled={subscribedCoins.includes(coin.symbol)}
                  >
                    {subscribedCoins.includes(coin.symbol)
                      ? 'Subscribed'
                      : 'Subscribe'}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
