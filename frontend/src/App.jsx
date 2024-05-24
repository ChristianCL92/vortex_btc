import { useState, useEffect } from 'react';
import axios from 'axios';
import AddTransaction from './components/AddTransaction';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {}, []);

  const handleAddTransaction = async (transaction) => {
    try {
      const response = await axios.post(
        'http://localhost:5001/api/v1/<placeholder>',
        transaction
      );
      setMessage(response.data.data.message);
    } catch (error) {
      console.error('Error adding transaction', error);
    }
  };

  return (
    <div>
      <h1>Blockchain Explorer</h1>
      <AddTransaction onAddTransaction={handleAddTransaction} />
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
