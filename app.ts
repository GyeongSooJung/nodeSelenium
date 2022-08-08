import express, { Request, Response, NextFunction } from 'express';

// parser
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// dotenv
import dotenv from 'dotenv'
dotenv.config();

// router
import chwideukRouter from './routers/chwideuk'
import sangsilRouter from './routers/sangsil'

const app = express();

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/chwideuk',chwideukRouter);
app.use('/sangsil',sangsilRouter);

app.listen('8000', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 8000
  ################################################
`);
});