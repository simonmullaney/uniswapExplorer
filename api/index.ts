import express from 'express';
const app = express();
import cors from 'cors';
const uniswapRoutes = require('./routes/uniswap')
const authRoutes = require('./routes/auth')
import {config} from "./config";
var { expressjwt: jwt } = require("express-jwt");

app.use(express.json())
app.use(cors());
app.use('/api/', authRoutes);
app.use(jwt({ secret: config.secret, algorithms: config.algorithms }));
app.use('/api/', uniswapRoutes);

app.listen(3000)
