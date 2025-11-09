import { DOM } from "./scripts/DOM.js";
import { Calculator } from "./scripts/Calculator.js";

const App = {
  firstOperand: "",
  operator: null,
  secondOperand: "",
  justOperated: false,

  handleControlClick(e) {
    if (typeof e.target.dataset.btnType === undefined) return;

    switch (e.target.dataset.btnType) {
      case "num":
        const num = e.target.value;
        this.handleNumClick(num);
        break;
      case "dec":
        this.handleDecClick();
        break;
      case "operator":
        const operator = e.target.value;
        this.handleOpClick(operator);
        break;
      case "clear":
        this.handleClearClick();
        break;
      case "backspace":
        this.handleBackSpaceClick();
        break;
      case "submit":
        this.handleSubmitClick();
        break;
    }

    this.view();
  },

  handleInputChange(e) {
    const input = e.data;

    if (this.isNumeric(input)) {
      this.handleNumClick(input);
    }

    const validOpers = ["/", "*", "+", "-"];
    if (validOpers.includes(input)) {
      this.handleOpClick(input);
    }

    if (input === null) {
      this.handleBackSpaceClick();
    }

    this.view();
  },

  resetApp(firstOperand = "", secondOperand = "", operator = null) {
    this.firstOperand = firstOperand;
    this.operator = operator;
    this.secondOperand = secondOperand;
    DOM.btnDecimal.disabled = false;
  },

  view() {
    if (this.firstOperand === null) {
      DOM.screen.value = "";
      return;
    }

    if (this.operator === null) {
      DOM.screen.value = `${this.firstOperand}`;
      return;
    }

    if (this.secondOperand === null) {
      DOM.screen.value = `${this.firstOperand} ${this.operator}`;
      return;
    }

    DOM.screen.value = `${this.firstOperand} ${this.operator} ${this.secondOperand}`;
  },

  // Helper event handlers
  handleNumClick(num) {
    // First num in after enter was pressed
    if (this.justOperated) {
      this.justOperated = false;
      this.firstOperand = "";
    }

    // Operator not present -> user still writing the first number
    if (this.operator === null) {
      if (num === "0" && this.firstOperand === "0") return;
      this.firstOperand += num;
      return;
    }

    // Both operands and an operator present
    if (num === "0" && this.secondOperand === "0") return;
    this.secondOperand += num;
  },

  handleOpClick(operator) {
    if (this.isUnaryMinus(operator)) {
      this.handleNumClick("-");
      return;
    }

    if (this.firstOperand === "" || this.firstOperand === "-") return;

    DOM.btnDecimal.disabled = false;

    if (this.secondOperand) {
      this.handleSubmitClick();
    }

    this.justOperated = false;
    this.operator = operator;
  },

  handleClearClick() {
    this.justOperated = false;
    DOM.screen.textContent = "";
    this.resetApp();
  },

  handleSubmitClick() {
    if (this.secondOperand === "") return;
    else if (this.operator === "/" && this.secondOperand === 0) {
      this.resetApp();
      DOM.screen.textContent = "Division by 0.";
      return;
    }

    const nDecimals = 6;
    const result =
      Math.round(
        Calculator.operate(
          parseFloat(this.firstOperand),
          parseFloat(this.secondOperand),
          this.operator
        ) *
          10 ** nDecimals
      ) /
      10 ** nDecimals;

    this.justOperated = true;
    DOM.btnDecimal.disabled = false;
    DOM.screen.textContent = String(result);
    this.resetApp(String(result));
  },

  handleDecClick() {
    // Neither number present
    if (this.firstOperand === "") return;

    // User just entered the operator
    if (this.justOperated) return;

    DOM.btnDecimal.disabled = true;
    this.handleNumClick("."); // Works the same as number, just adding a decimal instead of it
  },

  removeLastChar(string) {
    return string.slice(0, string.length - 1);
  },

  handleBackSpaceClick() {
    this.justOperated = false;

    if (!this.firstOperand) return;

    if (!this.operator) {
      this.firstOperand = this.removeLastChar(this.firstOperand);
    }

    if (!this.secondOperand) {
      this.operator = null;
    }

    this.secondOperand = this.removeLastChar(this.secondOperand);
  },

  startApp() {
    DOM.controlsContainer.addEventListener("click", (e) =>
      this.handleControlClick(e)
    );
    DOM.screen.addEventListener("input", (e) => this.handleInputChange(e));
  },

  // Validating
  isNumeric(number) {
    return !isNaN(number) && number !== null && number !== undefined;
  },

  isUnaryMinus(operator) {
    return (
      operator === "-" &&
      (this.firstOperand === "" ||
        (this.secondOperand === "" && this.operator !== null))
    );
  },
};

App.startApp();
