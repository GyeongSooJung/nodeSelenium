import express, { Request, Response, NextFunction } from 'express';

// parser
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// dotenv
import dotenv from 'dotenv'
dotenv.config();

// router
import oneRouter from './routers/one'

const app = express();

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/one',oneRouter)

app.listen('1234', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 1234🛡️
  ################################################
`);
});