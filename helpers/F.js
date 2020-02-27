class F {
  static getFirstFromArray(data) {
    return data[0];
  }

  static compose() {
    let arg = arguments;
    let start = arguments.length - 1;

    return function() {
      let i = start;
      let result = arg[i].apply(this, arguments);
      while (i--) {
        result = arg[i].call(this, result);
      }

      return result;
    }
  }
}

module.exports = F;
