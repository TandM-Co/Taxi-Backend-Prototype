const R = require('ramda');

const { Parser, F, dbErrorHandler, Limit, Validation } = require('../../helpers/index');
const { userQueries } = require('../../db/queries/index');
const { ErrorHandler, Response } = require('../../models/index');


async function calculateLimit(ctx) {

  const limitRequest = ctx.request.body;

  // const value = {
  //   refundLimit: 10,
  //   cardCounter: 1,
  //   lastMCounter: 4,
  //   lastQCouter: 3,
  //   regCouter: 32,
  //   avqBill: 200,
  // }

  const curryPath = R.curry(F.path);
  const curryIsMoreThan = R.curry(Validation.isMoreThan);

  const refundLimitIsZero = Validation.isZero;
  const cardCounterIsNotZero = Validation.isNotZero;
  const regCounterIsMoreThan = curryIsMoreThan;
  const lastQCounterMoreThan = curryIsMoreThan;
  const lastMountCounterIsMoreThanZero = curryIsMoreThan;
    
  const limitDecision = new Limit(limitRequest)
    .map(curryPath('refundLimit', refundLimitIsZero))
    .map(curryPath('cardCounter', cardCounterIsNotZero))
    .map(curryPath('lastMCounter', lastMountCounterIsMoreThanZero(3)))
    .map(curryPath('regCouter', regCounterIsMoreThan(30)))
    .map(curryPath('lastQCouter', lastQCounterMoreThan))
    .getOrElse(() => 0)

  return limitDecision;
}

module.exports = {
  calculateLimit,
};
