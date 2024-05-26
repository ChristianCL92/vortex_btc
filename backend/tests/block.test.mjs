import { describe, it, expect, beforeEach } from 'vitest';
import Block from '../models/Block.mjs';
import { GENESIS_DATA, MINE_RATE } from '../config/settings.mjs';
import hexToBinary from 'hex-to-binary';
import { generateHash } from '../utilities/crypto-lib.mjs';

describe('Block', () => {

    const timestamp = Date.now();
    const lastHash = '0';
    const hash = '0';
    const nonce = 1;
    const difficulty = 1;
    const data = { amount: 50, sender: 'James Bond', recipient: 'Ryan' }

    const block = new Block({
        timestamp,
        lastHash,
        hash,
        data,
        nonce,
        difficulty
    });

    describe('Properties', () => {
        it('should have the following propertis: timestamp, lastHash, hash, nonce, difficulty, data', () => {
            expect(block).toHaveProperty('timestamp');
            expect(block).toHaveProperty('lastHash');
            expect(block).toHaveProperty('hash');
            expect(block).toHaveProperty('nonce');
            expect(block).toHaveProperty('difficulty');
            expect(block).toHaveProperty('data');
        });

        it('should have values for each property', () => {
            expect(block.timestamp).toEqual(timestamp);
            expect(block.lastHash).toEqual(lastHash);
            expect(block.hash).toEqual(hash);
            expect(block.nonce).toEqual(nonce);
            expect(block.difficulty).toEqual(difficulty);
            expect(block.data).toEqual(data);
        });
    });

    describe('Genesis Block', () => {
        const genesisBlock = Block.genesisBlock;

        it('should return an instance of the block class', () => {
            expect(genesisBlock).toBeInstanceOf(Block);
        });

        it('should return the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });

    });

    describe('createBlock() function', () => {
        let lastBlock, data, createdBlock;

        beforeEach(() => {
            lastBlock = Block.genesisBlock;
            data = { message: 'Hello World!' };
            createdBlock = Block.createBlock({ lastBlock, data });
        });

        it('should return an instance of the Block class', () => {
            expect(createdBlock).toBeInstanceOf(Block);
        });

        it('should add a timestamp', () => {
            expect(createdBlock.timestamp).not.toBeUndefined();
        });

        it('should set the lastHash to match the lastBlock hash', () => {
            expect(createdBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('should set the data', () => {
            expect(createdBlock.data).toEqual(data);
        });

        it('should produce a hash that meets the difficulty level', () => {
            expect(
                hexToBinary(createdBlock.hash).substring(0, createdBlock.difficulty)
            ).toEqual('0'.repeat(createdBlock.difficulty));
        });

        it('should produce a hash based on correct input', () => {
            expect(createdBlock.hash).toEqual(
                generateHash(
                    createdBlock.timestamp,
                    createdBlock.lastHash,
                    createdBlock.nonce,
                    createdBlock.difficulty,
                    data
                )
            );
        });

    });

    describe('adjustDifficultyLvl()', () => {
        it('should raise the difficulty level for quickly created blocks', () => {
            expect(Block.adjustDifficultyLvl({
                block,
                timestamp: block.timestamp + MINE_RATE - 100
            })).toEqual(block.difficulty + 1);
        });

        it('should lower the difficulty level for slow created blocks', () => {
            expect(
                Block.adjustDifficultyLvl({
                    block,
                    timestamp: block.timestamp + MINE_RATE + 100
                })
            ).toEqual(block.difficulty - 1);
        });

    });

});