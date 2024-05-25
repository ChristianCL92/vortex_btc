import { useState, useEffect } from 'react';
import axios from 'axios';
import Blockchain from './components/Blockchain';
import AddTransaction from './components/AddTransaction';
import './App.css';

function App() {
  const [blockchain, setBlockchain] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBlockchain();
  }, []);

  const fetchBlockchain = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5001/api/v1/blockchain/'
      );
      setBlockchain(response.data.data.chain);
    } catch (error) {
      console.error('Error fetching blockchain', error);
    }
  };

  const handleAddTransaction = async (transaction) => {
    try {
      const response = await axios.post(
        'http://localhost:5001/api/v1/transactions/',
        transaction
      );
      if (response.data && response.data.message) {
        setMessage(response.data.message);
      } else {
        console.error('Unexpected response format:', response.data);
        setMessage('Unexpected response from server');
      }
      fetchBlockchain();
    } catch (error) {
      console.error('Error adding transaction', error);
      setMessage('Error adding transaction');
    }
  };

  return (
    <div>
      <h1>Blockchain Explorer</h1>
      <AddTransaction onAddTransaction={handleAddTransaction} />
      {message && <p>{message}</p>}
      {<Blockchain blockchain={blockchain} />}
    </div>
  );
}

export default App;
