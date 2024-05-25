import express from 'express';
import { addTransaction } from '../controllers/transaction-controller.mjs';

const router = express.Router();

// Endpoint för att lägga till en ny transaktion
router.route('/transactions').post(addTransaction);

export default router;
