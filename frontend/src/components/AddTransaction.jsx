import { useState } from 'react';
import '../App.css';

const AddTransaction = ({ onAddTransaction }) => {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = { sender, recipient, amount };
    onAddTransaction(transaction);
    setSender('');
    setRecipient('');
    setAmount('');
  };

  return (
    <div>
      <h2>Add Transaction</h2>
      <form
        onSubmit={handleSubmit}
        className="form-container"
      >
        <input
          type="text"
          placeholder="Sender"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        />
        <input
          type="text"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
