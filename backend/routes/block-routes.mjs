import express from 'express';
import {mineBlock} from '../controllers/block-controller.mjs';

const router = express.Router();

router.route('/mine').get( mineBlock);

export default router;
