import express, { Request, Response, NextFunction } from 'express';

// parser
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// dotenv
import dotenv from 'dotenv'
dotenv.config();

// router
import melonRouter from './routers/melon'
import genieRouter from './routers/genie'
import vibeRouter from './routers/vibe'

const app = express();

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/music-chart/melon',melonRouter);
app.use('/music-chart/genie',genieRouter);
app.use('/music-chart/vibe',vibeRouter);

app.listen('8000', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 8000
  ################################################
`);
});