import { blockchain } from "../server.mjs"

export const getBlockchain = (req, res) => { 
    
    res.status(200).json({success: true, statusCode: 200, data: blockchain})
}