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
        this.handleNumClick(e);
        break;
      case "dec":
        this.handleDecClick(e);
        break;
      case "operator":
        this.handleOpClick(e);
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
  },

  resetApp(firstOperand = "", secondOperand = "", operator = null) {
    this.firstOperand = firstOperand;
    this.operator = operator;
    this.secondOperand = secondOperand;
    DOM.btnDecimal.disabled = false;

    if (firstOperand === "") {
      this.view();
      return;
    }

    this.view(this.firstOperand);
  },

  view(message = "Start calculating") {
    DOM.screen.textContent = message;
  },

  // Helper event handlers
  handleNumClick(e) {
    // Working with numbers as if they were strings
    const num = e.target.value;

    // First num in after enter was pressed
    if (this.justOperated) {
      this.justOperated = false;
      this.firstOperand = "";
    }

    // Operator not present -> user still writing the first number
    if (this.operator === null) {
      if (num === "0" && this.firstOperand === "0") return;
      this.firstOperand += num;
      this.view(this.firstOperand);
      return;
    }

    // Both operands and an operator present
    if (num === "0" && this.secondOperand === "0") return;
    this.secondOperand += num;
    this.view(`${this.firstOperand} ${this.operator} ${this.secondOperand}`);
  },

  handleOpClick(e) {
    if (this.firstOperand === "") return;

    DOM.btnDecimal.disabled = false;

    if (this.operator) {
      this.handleSubmitClick(e);
    }

    this.justOperated = false;
    this.operator = e.target.value;
    this.view(`${this.firstOperand} ${this.operator}`);
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
    this.resetApp(result);
  },

  handleDecClick(e) {
    // Neither number present
    if (this.firstOperand === "") return;

    // User just entered the operator
    if (this.justOperated) return;

    DOM.btnDecimal.disabled = true;
    this.handleNumClick(e); // Works the same as number, just adding a decimal instead of it
  },

  removeLastChar(string) {
    return string.slice(0, string.length - 1);
  },

  handleBackSpaceClick() {
    if (!this.firstOperand) return;

    if (!this.operator) {
      this.firstOperand = this.removeLastChar(this.firstOperand);
      if (this.firstOperand === "") {
        this.view();
        return;
      }
      this.view(`${this.firstOperand}`);
      return;
    }

    if (!this.secondOperand) {
      this.operator = null;
      this.view(`${this.firstOperand} ${this.operator}`);
      return;
    }

    this.secondOperand = this.removeLastChar(this.secondOperand);
    this.view(`${this.firstOperand} ${this.operator} ${this.secondOperand}`);
  },

  startApp() {
    DOM.controlsContainer.addEventListener("click", (e) =>
      this.handleControlClick(e)
    );
  },
};

App.startApp();
