import Blockchain from '../models/Blockchain.mjs';
import Block from '../models/Block.mjs';
import { createHash } from '../utilities/crypto-lib.mjs';

const blockchain = new Blockchain();

function calculateHash(block) {
  const blockString =
    block.blockIndex +
    block.previousBlockHash +
    block.timestamp +
    JSON.stringify(block.data) +
    block.nonce;
  return createHash(blockString);
}

function mine(block) {
  let hash = '';
  let nonce = 0;

  while (
    hash.substring(0, block.difficulty) !==
    Array(block.difficulty + 1).join('0')
  ) {
    nonce++;
    hash = calculateHash({ ...block, nonce });
  }

  block.currentBlockHash = hash;
  block.nonce = nonce;

  return { hash, nonce };
}

const getBlockchain = (req, res, next) => {
  res.status(200).json({ success: true, data: { chain: blockchain.chain } });
};

const addBlock = (req, res, next) => {
  const { transactions } = req.body;

  const newBlock = new Block(
    Date.now(),
    blockchain.chain.length,
    blockchain.getLatestBlock().currentBlockHash,
    '',
    transactions,
    0,
    blockchain.difficulty
  );

  mine(newBlock);

  blockchain.chain.push(newBlock);
  blockchain.pendingTransactions = [];

  res.status(201).json({
    success: true,
    message: 'New block added to blockchain',
    block: newBlock,
  });
};

const validateBlockchain = (req, res, next) => {
  const isValid = blockchain.validateChain(createHash);
  if (isValid) {
    res.status(200).json({ success: true, message: 'Blockchain is valid' });
  } else {
    res.status(500).json({ success: false, message: 'Blockchain is invalid' });
  }
};

export { getBlockchain, addBlock, validateBlockchain };
