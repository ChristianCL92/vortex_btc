import express from "express";
import blockchainRouter from "./routes/blockchain-routes.mjs"
import blockRouter from "./routes/block-routes.mjs"

const app = express();

app.use("/api/v1/blockchain", blockchainRouter)
app.use("/api/v1/block", blockRouter)

const PORT = 4001;

app.listen(PORT, () => {
    console.log(`Application currently running on port: ${PORT}`);
})