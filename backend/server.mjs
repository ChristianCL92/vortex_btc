import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import blockchainRoutes from './routes/blockchain-routes.mjs';
import transactionRoutes from './routes/transaction-routes.mjs';

dotenv.config({ path: './config/config.env' });

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1', blockchainRoutes);
app.use('/api/v1', transactionRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
