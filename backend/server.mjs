import express from "express";
import blockchainRouter from "./routes/blockchain-routes.mjs"
import blockRouter from "./routes/block-routes.mjs"

const app = express();

app.use("/api/v1/blockchain", blockchainRouter)
app.use("/api/v1/block", blockRouter)

const PORT_DEFAULT = 4001;
let PORT_NODE;

if (process.env.CREATING_DYNAMIC_PORT === 'true') {
  PORT_NODE = PORT_DEFAULT + Math.ceil(Math.random() * 1000);
}

const PORT = PORT_NODE || PORT_DEFAULT;

app.listen(PORT, () => {
    console.log(`Application currently running on port: ${PORT}`);
})