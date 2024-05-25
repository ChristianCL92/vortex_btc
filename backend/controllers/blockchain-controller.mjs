import Blockchain from '../models/Blockchain.mjs';
import Block from '../models/Block.mjs';

const blockchain = new Blockchain();

const getBlockchain = (req, res) => {
  res.json({ success: true, data: { chain: blockchain.chain } });
};

const addBlock = (req, res) => {
  const newBlockData = req.body;
  const newBlock = new Block(
    blockchain.chain.length,
    Date.now(),
    newBlockData.transactions,
    blockchain.chain[blockchain.chain.length - 1].hash
  );
  blockchain.addBlock(newBlock);
  console.log('New block:', newBlock);

  res.json({ success: true, message: 'New block added to blockchain' });
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
