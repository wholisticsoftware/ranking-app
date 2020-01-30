const Router = require('koa-router');
const router = new Router();
const uuidv4 = require('uuid/v4');

router.get('/categories', async (ctx, next) => {
  console.info("GET /categories");
  let results = await ctx.db.collection('categories').find().toArray();
  ctx.body = '{"results":'+JSON.stringify(results)+'}';
});
router.post('/category',  async (ctx, next) => {
  console.warn("PUT /category: " + JSON.stringify(ctx.request.body));
  let json = ctx.request.body;
  const result = await ctx.db.collection('categories').insertOne({ _id: uuidv4(), name: json.name });
});
router.get("/category/:id", async(ctx, next) => {
  console.info("GET /category/"+ctx.params.id);
  let results = await ctx.db.collection('categories').find({"_id": ctx.params.id}).toArray();
  console.info("results: " + results);
  ctx.body = JSON.stringify(results[0]);  
})
router.delete("/category/:id", async(ctx, next) => {
  console.info("GET /category/"+ctx.params.id);
  ctx.db.collection('categories').remove({ _id: ctx.params.id })
})
router.put("/category/:id", async(ctx, next) => {
  let json = { $set: ctx.request.body };
  ctx.db.collection('categories').updateOne({ _id: ctx.params.id },json);
})

module.exports = router;