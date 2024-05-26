import crypto from 'crypto';
import pkg from 'elliptic';

const { ec } = pkg;

export const generateHash = (...args) => {
    return crypto
        .createHash('sha256')
        .update(
            args
                .map((arg) => JSON.stringify(arg))
                .sort()
                .join('')
        )
        .digest('hex');
}

export const ellipticHash = new ec('secp256k1');

export const verifySign = ({ publicKey, data, signature }) => {
    const key = ellipticHash.keyFromPublic(publicKey, 'hex');
    return key.verify(generateHash(data), signature);
}