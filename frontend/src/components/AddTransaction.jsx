import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const AddTransaction = ({ onAddTransaction }) => {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    const transaction = {
      sender,
      recipient,
      amount,
      transactionId: uuidv4().replaceAll('-', ''),
    };

    try {
      await axios.post(
        'http://localhost:5001/api/v1/transactions/',
        transaction
      );

      await axios.post('http://localhost:5001/api/v1/blockchain/block', {
        transactions: [transaction],
      });

      await axios.get('http://localhost:5001/api/v1/blockchain/validate');

      onAddTransaction(); // Anropa funktionen för att uppdatera blockchain-tillståndet i App.jsx

      setSender('');
      setRecipient('');
      setAmount('');
    } catch (error) {
      console.error('Error adding transaction', error);
    }
  };

  return (
    <div>
      <h2>Add Transaction</h2>
      <form
        onSubmit={handleAddTransaction}
        className="form-container"
      >
        <div>
          <input
            type="text"
            placeholder="Sender"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
