import React, { useState } from 'react';

const AddTransaction = ({ onAddTransaction }) => {
  const [amount, setAmount] = useState('');
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');

  return (
    <div>
      <h2>Add Transaction</h2>
      <form>
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sender</label>
          <input
            type="text"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Recipient</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
