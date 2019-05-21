import express from 'express';
import bodyParser from 'body-parser';
import userRouter from "./user";
const app = express();

app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());
app.use("/user",userRouter);
app.post('/', (request, response) => {
  response.send(request.body);
});

app.listen(5000);