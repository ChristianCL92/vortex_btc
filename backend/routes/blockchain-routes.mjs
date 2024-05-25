import express from 'express';
import {
  getBlockchain,
  addBlock,
  validateBlockchain,
} from '../controllers/blockchain-controller.mjs';

const router = express.Router();

// Endpoint för att hämta hela blockkedjan
router.route('/blockchain').get(getBlockchain);

// Endpoint för att lägga till ett nytt block i blockkedjan
router.route('/blockchain/block').post(addBlock);

// Endpoint för att validera hela blockkedjan
router.route('/blockchain/validate').get(validateBlockchain);

export default router;
