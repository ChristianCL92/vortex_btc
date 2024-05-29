import React from 'react';

const Blockchain = ({ blockchain }) => {
  return (
    <div>
      <h2>Blockchain</h2>
      {blockchain.map((block, index) => (
        <ul key={index} className="block-container">
          <li>
            <h3>
              <span className="label">Block</span> {block.index}
            </h3>
          </li>
          <li>
            <span className="label">Timestamp:</span>{' '}
            {block.timestamp && new Date(block.timestamp).toLocaleString()}
          </li>
          <li>
            <span className="label">Previous Hash:</span> {block.lastHash}
          </li>
          <li>
            <span className="label">Hash:</span> {block.hash}
          </li>
          <li>
            <span className="label">Nonce:</span> {block.nonce}
          </li>
          <li>
            <span className="label">Difficulty:</span> {block.difficulty}
          </li>
          <li>
            <span className="label">Transactions:</span>
            {block.data &&
              block.data.map((transaction, index) => {
                return (
                  <div key={index} className="transaction">
                    <ul>
                      <li>
                        <b>Transaction nr: </b>
                        {index + 1}
                      </li>
                      <li>
                        <b>Sender:</b> {transaction.sender}
                      </li>
                      <li>
                        <b>Recipient:</b> {transaction.recipient}
                      </li>
                      <li>
                        <b>Amount:</b> {transaction.amount}
                      </li>
                    </ul>
                  </div>
                );
              })}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Blockchain;
