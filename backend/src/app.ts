import * as Koa from 'koa';
import * as Router from 'koa-router';
const mongo = require('koa-mongo');

const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const catRoutes = require('./routes/categories');

const app = new Koa();
app.use(cors());
app.use(mongo({"db":"ranker"}));
app.use(bodyParser());

app.use(catRoutes.routes());
app.use(catRoutes.allowedMethods());

app.listen(3001);

console.log('Server running on port 3001');



/*
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const mongo = require('koa-mongo')
var bodyParser = require('koa-bodyparser');

const catRoutes = require('./routes/categories');

const app = new Koa();

app.use(cors());
app.use(mongo({"db":"ranker"}));
app.use(bodyParser());

//app.use(catRoutes.routes());
//app.use(catRoutes.allowedMethods());

let router = new Router();
router.get('/*', async (ctx) => {
    ctx.body = 'Hello World!';
});

const server = app.listen(3001);
module.exports = server;
*/