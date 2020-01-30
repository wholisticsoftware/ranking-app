// app.js
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const mongo = require('koa-mongo')
var bodyParser = require('koa-bodyparser');

const uuidv4 = require('uuid/v4');

const catRoutes = require('./routes/categories');

const app = new Koa();

app.use(cors());
app.use(mongo({"db":"ranker"}));
app.use(bodyParser());


app.use(catRoutes.routes());
app.use(catRoutes.allowedMethods());

const server = app.listen(3001);
module.exports = server;