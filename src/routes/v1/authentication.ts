const Router = require('koa-router');

const { ROUTES_NAME } = require('../../constants/index');
const { authenticationController } = require('../../controllers/v1/index');
const { createToken } = require('../../helpers/index')


const router = new Router({
  prefix: `/${ROUTES_NAME.ROOT}/${ROUTES_NAME.AUTHENTICATION.ROOT}`
});

router.post(
  `/${ROUTES_NAME.AUTHENTICATION.ROUTES.LOGIN}`, 
  async (ctx, next) => {
    try {
      const result = await authenticationController.login(ctx);
      ctx.state.user = result;
      next()
    } catch(err) {
      ctx.app.emit('error', err, ctx);
    }
  }
);

router.post(
  `/${ROUTES_NAME.AUTHENTICATION.ROUTES.REGISTRATION}`,
  async (ctx, next) => {
    try {
      const result = await authenticationController.registration(ctx);
      ctx.state.user = result;
      next()
    } catch (err) {
      ctx.app.emit('error', err, ctx);
    }
  }
);

router.use(async (ctx, next) => {
  const token = await createToken(ctx.state.user);
  ctx.status = 200;
  ctx.body = token;
  next();
});

module.exports = router;
