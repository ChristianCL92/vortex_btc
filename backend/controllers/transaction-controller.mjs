import { blockchain } from "../server.mjs";
import { pubnubServer } from "../server.mjs";

export const createTransaction = (req, res, next) => {
  const transactionData = req.body;

   const transactionDetails = blockchain.addTransaction(
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
      data: { message: 'transaktionen skapad', transactionDetails },
    });
};
