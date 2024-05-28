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

  const handleAddTransaction = (newBlockchain) => {
    setBlockchain(newBlockchain);
    setMessage('Transaction added and blockchain updated');

    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div>
      <h1>VORTEX</h1>
      <AddTransaction onAddTransaction={handleAddTransaction} />
      {message && <p className="message">{message}</p>}
      <Blockchain blockchain={blockchain} />
    </div>
  );
}

export default App;
