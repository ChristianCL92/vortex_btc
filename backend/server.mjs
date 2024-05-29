import express from "express";
import cors from "cors";
import Blockchain from "./models/Blockchain.mjs"
import PubNubServer from "./pubnubServer.mjs"
import blockchainRouter from "./routes/blockchain-routes.mjs"
import blockRouter from "./routes/block-routes.mjs"
import dotenv from "dotenv";
import transactionRouter from "./routes/transaction-routes.mjs";

dotenv.config({ path: "./config/.env" });



const credentials = {
  publishKey: process.env.PUBLISH_KEY,
  subscribeKey: process.env.SUBSCRIBE_KEY,
  secretKey: process.env.SECRET_KEY,
  userId: process.env.USER_ID,
};

export const blockchain = new Blockchain();
export const pubnubServer = new PubNubServer({ blockchain : blockchain, credentials: credentials});


const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());


setTimeout(() => {
  pubnubServer.broadcast();
}, 1000)

app.use("/api/v1/blockchain", blockchainRouter)
app.use("/api/v1/transactions", transactionRouter)
app.use("/api/v1/block", blockRouter)

const PORT_DEFAULT = 4001;
const ROOT_NODE = `http://localhost:${PORT_DEFAULT}`;
let PORT_NODE;

const synchronize = async () => {
  const response = await fetch(`${ROOT_NODE}/api/v1/blockchain`);
  if (response.ok) {
    const result = await response.json();
    console.log('SYNC', result.data);
    blockchain.substituteChain(result.data);
  }
};

if (process.env.CREATING_DYNAMIC_PORT === 'true') {
  PORT_NODE = PORT_DEFAULT + Math.ceil(Math.random() * 1000);
}

const PORT = PORT_NODE || PORT_DEFAULT;

app.listen(PORT, () => {
    console.log(`Application currently running on port: ${PORT}`);

    if (PORT !== PORT_DEFAULT) {
      synchronize();
    }
})