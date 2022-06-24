const express = require('express');
const app = express();
const uniswapRoutes = require('./routes/uniswap')

app.use('/api/', uniswapRoutes);


app.listen(3000)
