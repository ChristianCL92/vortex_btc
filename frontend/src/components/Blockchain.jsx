import React from 'react';

const Blockchain = ({ blockchain }) => {
  return (
    <div>
      <h2>Blockchain</h2>
      {blockchain.map((block, index) => (
        <div key={index}>
          <h3>Block {block.blockIndex}</h3>
          <p>Timestamp: {new Date(block.timestamp).toLocaleString()}</p>
          <p>Previous Hash: {block.previousBlockHash}</p>
          <p>Hash: {block.currentBlockHash}</p>
          <p>Nonce: {block.nonce}</p>
          <p>Difficulty: {block.difficulty}</p>
          <p>Data: {JSON.stringify(block.data)}</p>
        </div>
      ))}
    </div>
  );
};

export default Blockchain;
