import Transaction from '../models/Transaction.mjs';
import Blockchain from '../models/Blockchain.mjs';

const blockchain = new Blockchain();

const addTransaction = (req, res, next) => {
  const transaction = req.body;

  const blockIndex = blockchain.addTransaction(transaction);
  res.json({
    success: true,
    message: 'Transaction added to memory pool',
    transaction: blockIndex,
  });
};

export { addTransaction };
