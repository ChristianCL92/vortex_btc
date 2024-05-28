import Blockchain from '../models/Blockchain.mjs';
import Block from '../models/Block.mjs';

const blockchain = new Blockchain();

const getBlockchain = (req, res) => {
  res.json({ success: true, data: { chain: blockchain.chain } });
};

const addBlock = (req, res) => {
  const { transactions } = req.body;
  const newBlock = new Block(
    blockchain.getLatestBlock().index + 1,
    Date.now(),
    transactions,
    blockchain.getLatestBlock().hash
  );

  blockchain.addBlock(newBlock);

  res.json({
    success: true,
    message: 'New block added to blockchain',
    block: newBlock,
  });
};

const validateBlockchain = (req, res) => {
  const isValid = blockchain.validate();
  if (isValid) {
    res.json({ success: true, message: 'Blockchain is valid' });
  } else {
    res.json({ success: false, message: 'Blockchain is invalid' });
  }
};

export { getBlockchain, addBlock, validateBlockchain };
