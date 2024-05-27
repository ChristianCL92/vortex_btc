import { generateHash } from "../utils/crypto-lib.mjs";

export default class Blockchain {
  constructor() {
    this.chain = [];
    this.memberNodes = [];
    this.nodeUrl = process.argv[3];

    this.createBlock(Date.now(), "0", "0", [], 2048, process.env.DIFFICULTY);
  }

  getLastBlock() {
    return this.chain.at(-1);
  }

  hashBlock(timestamp, previousBlockHash, currentBlockData, nonce, difficulty) {
    const stringToHash =
      timestamp.toString() +
      previousBlockHash +
      JSON.stringify(currentBlockData) +
      nonce +
      difficulty;
    const hash = generateHash(stringToHash);

    return hash;
  }

  validateChain(blockchain) {
    let isValid = true;

    for (let i = 1; i < blockchain.length; i++) {
      const block = blockchain[i];
      const previousBlock = blockchain[i - 1];

      const hash = this.hashBlock(
        block.timestamp,
        previousBlock.currentBlockHash,
        block.data
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
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return { nonce, difficulty, timestamp };
  }
}