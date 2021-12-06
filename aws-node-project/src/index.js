
const express = require('express');
const cors = require('cors');

if(!process.env.LAMBDA_FUNCTION_RUNNING){

    require('dotenv').config()
}
const indexRouter = require('./routes/indexRouter');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/',indexRouter);

module.exports = app;