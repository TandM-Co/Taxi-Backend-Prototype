const Router = require('koa-router');

const { AUTHENTICATION, ROOT } = require('../../constants/routesName');
const { authenticationController } = require('../../controllers/v1/index');


const router = new Router({
  prefix: `/${ROOT}/${AUTHENTICATION.ROOT}`
});

router.post(
  `/${AUTHENTICATION.ROUTES.LOGIN}`, 
  async (ctx) => {
    const result = await authenticationController.login(ctx);

    ctx.status = 200;
    ctx.body = result;
  }
);

router.post(
  `/${AUTHENTICATION.ROUTES.REGISTRATION}`,
  async (ctx) => {
    const result = await authenticationController.registration(ctx);

    ctx.status = 200;
    ctx.body = result;
  }
);

module.exports = router;
