const Router = require('koa-router');

const { ROUTES_NAME } = require('../../constants/index');
const { clientController } = require('../../controllers/v1/index');
const { createToken } = require('../../helpers/index')


const router = new Router({
  prefix: `/${ROUTES_NAME.ROOT}/${ROUTES_NAME.CLIENTS.ROOT}`
});

router.post(
  `/${ROUTES_NAME.CLIENTS.ROUTES.LIMITS}`, 
  async (ctx, next) => {
    try {
      const result = await clientController.calculateLimit(ctx)
      console.log(result)
      ctx.state.user = result;
      next()
    } catch(err) {
      ctx.app.emit('error', err, ctx);
    }
  }
);

router.use(async (ctx, next) => {
  
});

module.exports = router;
