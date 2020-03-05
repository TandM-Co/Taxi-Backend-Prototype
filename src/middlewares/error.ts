function error(error, ctx) {
  const { status, body } = error;

  ctx.status = status;
  ctx.body = body;
}

module.exports = error;