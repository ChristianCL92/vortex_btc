import Transaction from '../models/Transaction.mjs';
import Blockchain from '../models/Blockchain.mjs';

const blockchain = new Blockchain();

const addTransaction = (req, res) => {
  const { sender, recipient, amount } = req.body;
  const newTransaction = new Transaction(sender, recipient, amount);
  blockchain.addTransaction(newTransaction);
  res.json({
    success: true,
    message: 'Transaction added to memory pool',
    transaction: newTransaction,
  });
};

export { addTransaction };
