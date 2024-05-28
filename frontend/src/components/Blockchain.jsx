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
          <h3>
            <span className="label">Block</span> {block.blockIndex}
          </h3>
          <p>
            <span className="label">Timestamp:</span>{' '}
            {block.timestamp && new Date(block.timestamp).toLocaleString()}
          </p>
          <p>
            <span className="label">Previous Hash:</span>{' '}
            {block.previousBlockHash}
          </p>
          <p>
            <span className="label">Hash:</span> {block.currentBlockHash}
          </p>
          <p>
            <span className="label">Nonce:</span> {block.nonce}
          </p>
          <p>
            <span className="label">Transactions:</span>
            {block.data && block.data.length > 0 ? (
              block.data.map((tx, txIndex) => (
                <span key={txIndex}>
                  {` ID: ${tx.transactionId}, Sender: ${tx.sender}, Recipient: ${tx.recipient}, Amount: ${tx.amount}`}
                </span>
              ))
            ) : (
              <span> No transactions</span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Blockchain;
