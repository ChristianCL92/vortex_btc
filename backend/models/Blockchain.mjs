import Block from '../models/Block.mjs';

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
    this.difficulty = 2;
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), [], '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(transaction) {
    const latestBlock = this.getLatestBlock();
    latestBlock.transactions.push(transaction);
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.chain[this.chain.length - 1].hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    this.pendingTransactions = [];
  }

  validate() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

export default Blockchain;
