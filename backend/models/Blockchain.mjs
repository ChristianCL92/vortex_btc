import Block from './Block.mjs';
import Transaction from './Transaction.mjs';
import { createHash } from '../utilities/crypto-lib.mjs';

export default class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.difficulty = 2;

    this.createBlock(Date.now(), '0', '0', [], 0, 2);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  createBlock(
    timestamp,
    previousBlockHash,
    currentBlockHash,
    data,
    nonce,
    difficulty
  ) {
    const block = new Block(
      timestamp,
      this.chain.length + 1,
      previousBlockHash,
      currentBlockHash,
      data,
      nonce,
      difficulty
    );
    this.pendingTransactions = [];
    this.chain.push(block);
    return block;
  }

  createTransaction(amount, sender, recipient) {
    return new Transaction(amount, sender, recipient);
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
    return this.getLastBlock().blockIndex + 1;
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  hashBlock(timestamp, previousBlockHash, currentBlockData, nonce, difficulty) {
    const stringToHash =
      timestamp.toString() +
      previousBlockHash +
      JSON.stringify(currentBlockData) +
      nonce +
      difficulty;
    const hash = createHash(stringToHash);
    return hash;
  }

  validateChain() {
    let isValid = true;

    for (let i = 1; i < this.chain.length; i++) {
      const block = this.chain[i];
      const previousBlock = this.chain[i - 1];

      const hash = this.hashBlock(
        block.timestamp,
        previousBlock.currentBlockHash,
        block.data,
        block.nonce,
        block.difficulty
      );

      if (hash !== block.currentBlockHash) isValid = false;
      if (block.previousBlockHash !== previousBlock.currentBlockHash)
        isValid = false;
    }

    return isValid;
  }

  proofOfWork(previousBlockHash, data) {
    const lastBlock = this.getLastBlock();
    let difficulty, hash, timestamp;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();

      difficulty = this.difficultyAdjustment(lastBlock, timestamp);
      hash = this.hashBlock(
        timestamp,
        previousBlockHash,
        data,
        nonce,
        difficulty
      );
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return { nonce, difficulty, timestamp };
  }

  difficultyAdjustment(lastBlock, timestamp) {
    const MINE_RATE = process.env.MINE_RATE;
    let { difficulty } = lastBlock;

    if (difficulty < 1) return 1;

    return timestamp - lastBlock.timestamp > MINE_RATE
      ? +difficulty + 1
      : +difficulty - 1;
  }
}
