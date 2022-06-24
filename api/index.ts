import express from 'express';
const app = express();
import cors from 'cors';
const uniswapRoutes = require('./routes/uniswap')


app.use(cors());
app.use('/api/', uniswapRoutes);


app.listen(3000)
