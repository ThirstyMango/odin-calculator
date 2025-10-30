const Calculator = {
  add(n1, n2) {
    return n1 + n2;
  },
  substract(n1, n2) {
    return n1 - n2;
  },
  multiply(n1, n2) {
    return n1 * n2;
  },
  divide(num, denom) {
    if (denom === 0) return "Invalid expression";
    return num / denom;
  },
  operate(n1, n2, operator) {
    let result = null;
    switch (operator) {
      case "+":
        result = this.add(n1, n2);
        break;
      case "-":
        result = this.substract(n1, n2);
        break;
      case "*":
        result = this.multiply(n1, n2);
        break;
      case "/":
        result = this.divide(n1, n2);
        break;
    }
    return result;
  },
};

export { Calculator };
