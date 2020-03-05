const Router = require('koa-router');

const { ROUTES_NAME } = require('../../constants/index');
const { clientController } = require('../../controllers/v1/index');


const router = new Router({
  prefix: `/${ROUTES_NAME.ROOT}/${ROUTES_NAME.CLIENTS.ROOT}`
});

router.post(
  `/:id/${ROUTES_NAME.CLIENTS.ROUTES.CALCULATE}`, 
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

router.post(
  `/:id/${ROUTES_NAME.CLIENTS.ROUTES.USE}`, 
  async (ctx, next) => {
    try {
      const result = await clientController.useLimit(ctx);
      ctx.state.clientLimit = result;
      next()
    } catch(err) {
      ctx.app.emit('error', err, ctx);
    }
  }
);

router.post(
  `/:id/${ROUTES_NAME.CLIENTS.ROUTES.REPAYMENT}`,
  async (ctx, next) => {
    try {
      const result = await clientController.repaymentLimit(ctx)
      ctx.state.clientLimit = result;
      next()
    } catch(err) {
      ctx.app.emit('error', err, ctx);
    }
  }
)

router.use(async (ctx, next) => {
  ctx.status = 200;
  ctx.body = ctx.state.clientLimit;
  await clientController.saveOperation(ctx)
  next();
});

module.exports = router;
