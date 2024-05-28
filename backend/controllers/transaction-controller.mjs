import { blockchain } from "../server.mjs";
import { pubnubServer } from "../server.mjs";

export const createTransaction = (req, res) => {
  const transactionData = req.body;

  const blockIndex = blockchain.addTransaction(
    transactionData.amount,
    transactionData.sender,
    transactionData.recipient
  );

  pubnubServer.broadcast();

  res
    .status(201)
    .json({
      success: true,
      statusCode: 201,
      data: { message: 'transaktionen skapad', transactionData, blockIndex },
    });
};
