import hexToBinary from 'hex-to-binary';
import { GENESIS_DATA, MINE_RATE } from '../config/settings.mjs';
import { generateHash } from '../utilities/crypto-lib.mjs';

export default class Block {
    constructor({ timestamp, lastHash, hash, nonce, difficulty, data }) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static get genesisBlock() {
        return new this(GENESIS_DATA);
    }

    static createBlock({ lastBlock, data }) {
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let hash, timestamp;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficultyLvl({ block: lastBlock, timestamp });
            hash = generateHash(timestamp, lastHash, data, nonce, difficulty);
        } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({
            timestamp,
            lastHash,
            hash,
            data,
            nonce,
            difficulty
        })
    }

    static adjustDifficultyLvl({ block, timestamp }) {
        const { difficulty } = block;

        if (timestamp - block.timestamp > MINE_RATE) return difficulty - 1;

        return difficulty + 1;
    }
}