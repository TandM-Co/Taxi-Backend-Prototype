const R = require('ramda');

const { F, Validation, Limit } = require('../../helpers/index');
const { clientLimitQueries, operationQueries } = require('../../db/queries/index');


async function calculateLimit(ctx) {
  const limitRequest = ctx.request.body;
  const { clientId, partnerId } = ctx.request.body;
  const { selectClientLimit, updateClientTotalLimit, inserClientLimit } = clientLimitQueries;

  const userResponse = await ctx.db.query(selectClientLimit(), [clientId, partnerId]);

  const rowLens = R.lensPath(['rows']);
  const curryView = R.curry(R.view);

  const getUser = R.pipe(
    curryView(rowLens),
    F.getFirstFromArray
  );

  const user = getUser(userResponse)

  if (!user) {
    const insertedUser = await ctx.db.query(inserClientLimit(), [clientId, partnerId, 0])
    return getUser(insertedUser)
  }

  const curryPath = R.curry(F.path);
  const curryIsMoreThan = R.curry(Validation.isMoreThan);
    
  const limitDecision = new Limit(limitRequest)
    .map(curryPath('refundLimit', Validation.isZero))
    .map(curryPath('cardCounter', Validation.isNotZero))
    .map(curryPath('lastMCounter', curryIsMoreThan(3)))
    .map(curryPath('regCouter', curryIsMoreThan(30)))
    .map(curryPath('lastQCouter', curryIsMoreThan(0)))
    .getOrElse(() => 0)

  const updatedUser = await ctx.db.query(updateClientTotalLimit(), [limitDecision, clientId, partnerId])

  return getUser(updatedUser);
}

async function saveOperation(ctx) {
  const { inserOperation } = operationQueries;
  const { client_id, partner_id, oper_type = null, oper_status = null, req_time = null, fault_sum = null} = ctx.state.clientLimit;

  await ctx.db.query(inserOperation(), [client_id, partner_id, oper_type, oper_status, req_time, fault_sum])
}

module.exports = {
  calculateLimit,
  saveOperation,
};
