import React from 'react';

const Blockchain = ({ blockchain }) => {
  return (
    <div>
      <h2>Blockchain</h2>
      {blockchain.map((block, index) => (
        <div
          key={index}
          className="block-container"
        >
          <h3>Block {block.index}</h3>
          <p>
            Timestamp:{' '}
            {block.timestamp && new Date(block.timestamp).toLocaleString()}
          </p>
          <p>Previous Hash: {block.previousHash}</p>
          <p>Hash: {block.hash}</p>
          <p>Nonce: {block.nonce}</p>
          <p>Transactions: {JSON.stringify(block.transactions)}</p>
        </div>
      ))}
    </div>
  );
};

export default Blockchain;
