import express from 'express';
//import mineBlock from "./block-controller.mjs"
const router = express.Router();

router.route('/mine').post(/* mineBlock */);

export default router;
