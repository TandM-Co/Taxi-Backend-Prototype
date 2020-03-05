const R = require('ramda');

const { F, Validation, Limit } = require('../../helpers/index');
const { clientLimitQueries, operationQueries } = require('../../db/queries/index');


async function calculateLimit(ctx) {
  const limitRequest = ctx.request.body;
  const { partnerId } = ctx.request.body;
  const { selectClientLimit, updateClientTotalLimit, inserClientLimit } = clientLimitQueries;
  const clientId = ctx.params.id;

  const userResponse = await ctx.db.query(selectClientLimit(), [clientId, partnerId]);

  const rowLens = R.lensPath(['rows']);
  const curryView = R.curry(R.view);

  const getClient = R.pipe(
    curryView(rowLens),
    F.getFirstFromArray
  );

  const user = getClient(userResponse)

  if (!user) {
    const insertedUser = await ctx.db.query(inserClientLimit(), [clientId, partnerId, 0])
    return getClient(insertedUser)
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

  return getClient(updatedUser);
}

async function useLimit(ctx) {
  const { partnerId, usedLimit } = ctx.request.body;
  const { useClientsLimit, selectClientLimit } = clientLimitQueries;
  const clientId = ctx.params.id;

  const rowLens = R.lensPath(['rows']);
  const curryView = R.curry(R.view);

  const getClient = R.pipe(
    curryView(rowLens),
    F.getFirstFromArray
  );

  const userResponse = await ctx.db.query(selectClientLimit(), [clientId, partnerId]);

  const user = getClient(userResponse);

  const usedL = Number(usedLimit) + Number(user.used_limit);

  if (usedL > Number(user.total_limit)) {
    return null;
  }

  const updatedUser = await ctx.db.query(useClientsLimit(), [usedL, clientId, partnerId]);
  return updatedUser;
}

async function repaymentLimit(ctx) {
  const { partnerId, repayment } = ctx.request.body;
  const { useClientsLimit, selectClientLimit } = clientLimitQueries;
  const clientId = ctx.params.id;

  const rowLens = R.lensPath(['rows']);
  const curryView = R.curry(R.view);

  const getClient = R.pipe(
    curryView(rowLens),
    F.getFirstFromArray
  );

  const userResponse = await ctx.db.query(selectClientLimit(), [clientId, partnerId]);

  const user = getClient(userResponse);

  const currentLimit = Number(user.used_limit) - Number(repayment);

  const updatedUser = await ctx.db.query(useClientsLimit(), [currentLimit, clientId, partnerId]);
  return updatedUser;
}

async function saveOperation(ctx) {
  const { inserOperation } = operationQueries;
  const { client_id, partner_id, oper_type = null, oper_status = null, req_time = null, fault_sum = null} = ctx.state.clientLimit;

  await ctx.db.query(inserOperation(), [client_id, partner_id, oper_type, oper_status, req_time, fault_sum])
}

module.exports = {
  calculateLimit,
  saveOperation,
  useLimit,
  repaymentLimit,
};
