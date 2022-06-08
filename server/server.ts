  
import express, { Request, Response, NextFunction, RequestHandler } from 'express';
const bcryptController = require('./routes/authRoute')


type ServerError = {
    log: string,
    status: number,
    message : {
        err: string
    }
}

const app = express();
app.use(express.json());

// app.get('/test', (req, res, next) =>  {
//   console.log('here')
//   console.log('again')
//   res.send('test')});

app.post('/signup', bcryptController.signUp, (req, res) => {
   res.sendStatus(200);
})

app.get('/login', bcryptController.checkCreds, (req, res) => {
  res.status(200).json(res.locals.userInfo);
})

app.use('/', (err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
})

app.listen(3000, () => console.log('server is listening on port 3000'));