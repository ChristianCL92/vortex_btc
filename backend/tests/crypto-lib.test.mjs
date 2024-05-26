import { describe, expect, it } from "vitest";
import { generateHash } from "../utilities/crypto-lib.mjs";

describe('Hashing', () => {

    it('should produce a hash with supplied arguments', () => {
        expect(
            generateHash('James', 'Bond')).toEqual(generateHash('James', 'Bond'));
    });

    it('should produce a Hash with supplied arguments in any order', () => {
        expect(generateHash('James', 'Bond')).toEqual(generateHash('Bond', 'James'))
    });

    it('should create a unique hash when any property have changed', () => {
        const obj = {};
        const originalHash = generateHash(obj);
        obj['name'] = 'James Bond';

        expect(generateHash(obj)).not.toEqual(originalHash);
    });

});