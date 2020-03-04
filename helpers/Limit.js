class Right {
  constructor(value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  map(f) {
    const result = f(this._value);
    return result ? new Right(this._value) : new Left(result);
  }

  getOrElse(other) {
    return this._value.avqBill;
  }
}

class Left {
  constructor(value) {
    this._value = value;
  }

  map() {
    return this;
  }

  getOrElse(other) {
    return other();
  }
}

class Limit {
  constructor(value) {
    this._value = value;
  }

  map(f) {
    const result = f(this._value);
    return result ? new Right(this._value) : new Left(result);
  }
}

module.exports = Limit;
