class Validation {
  static isZero(number) {
    return Number(number) === 0;
  }

  static isNotZero(number) {
    return !Validation.isZero(number);
  }

  static isMoreThan(length, number) {
    return number > length;
  }

  static isLessThan(length, number) {
    return Validation.isMoreThan(length, number);
  }
}

module.exports = Validation;
