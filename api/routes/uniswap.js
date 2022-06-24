const express = require('express');
const router = express.Router();
const uniswapController = require('../controllers/uniswap');


router.get('/uniswap/', uniswapController.getUniswapData);

module.exports = router;
