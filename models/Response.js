const R = require('ramda');

class Response {
  constructor(response) {
    this._response = response;
  };

  isEmpty() {
    return R.isEmpty(
      R.length(this._response)
    );
  };
}

module.exports = Response;
