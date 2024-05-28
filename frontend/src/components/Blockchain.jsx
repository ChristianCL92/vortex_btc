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
            <span className="label">Timestamp:</span>
            <span>
              {block.timestamp && new Date(block.timestamp).toLocaleString()}
            </span>
          </p>
          <p>
            <span className="label">Previous Block Hash:</span>
            <span>{block.previousBlockHash}</span>
          </p>
          <p>
            <span className="label">Current Block Hash:</span>
            <span>{block.currentBlockHash}</span>
          </p>
          <p>
            <span className="label">Nonce:</span>
            <span>{block.nonce}</span>
          </p>
          <p>
            <span className="label">Difficulty:</span>
            <span>{block.difficulty}</span>
          </p>
          <p>
            <span className="label">Transactions:</span>
            <span>
              {block.data && block.data.length > 0 ? (
                block.data.map((tx, txIndex) => (
                  <span key={txIndex}>
                    {` ID: ${tx.transactionId}, Sender: ${tx.sender}, Recipient: ${tx.recipient}, Amount: ${tx.amount}`}
                  </span>
                ))
              ) : (
                <span>No transactions</span>
              )}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Blockchain;
