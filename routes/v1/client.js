const Router = require('koa-router');

const { ROUTES_NAME } = require('../../constants/index');
const { clientController } = require('../../controllers/v1/index');


const router = new Router({
  prefix: `/${ROUTES_NAME.ROOT}/${ROUTES_NAME.CLIENTS.ROOT}`
});

router.post(
  `/${ROUTES_NAME.CLIENTS.ROUTES.LIMITS}`, 
  async (ctx, next) => {
    try {
      const result = await clientController.calculateLimit(ctx)
      ctx.state.clientLimit = result;
      next()
    } catch(err) {
      ctx.app.emit('error', err, ctx);
    }
  }
);

router.use(async (ctx, next) => {
  ctx.status = 200;
  ctx.body = ctx.state.clientLimit;
  await clientController.saveOperation(ctx)
  next();
});

module.exports = router;
