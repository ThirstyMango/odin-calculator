import { DOM } from "./scripts/DOM.js";
import { Calculator } from "./scripts/Calculator.js";

const App = {
  firstOperand: null,
  operator: null,
  secondOperand: null,

  handleControlClick(e) {
    if (typeof e.target.dataset.btnType === undefined) return;

    switch (e.target.dataset.btnType) {
      case "num":
        this.handleNumClick(e);
        break;
      case "operator":
        this.handleOpClick(e);
        break;
      case "clear":
        this.handleClearClick();
        break;
      case "submit":
        this.handleSubmitClick();
        break;
    }
  },

  resetApp(firstOperand = 0, secondOperand = 0, operator = null) {
    this.firstOperand = firstOperand;
    this.operator = operator;
    this.secondOperand = secondOperand;
  },

  // Helper event handlers
  handleNumClick(e) {
    const num = parseFloat(e.target.value);

    // First operand not yet present
    if (this.firstOperand === null) {
      this.firstOperand = num;
      DOM.screen.textContent = this.firstOperand;
      return;
    }

    // Operator not present -> user still writing the first number
    if (this.operator === null) {
      this.firstOperand = this.firstOperand * 10 + num;
      DOM.screen.textContent = this.firstOperand;
      return;
    }

    // Second operand not yet present
    if (this.secondOperand === null) {
      this.secondOperand = num;
      DOM.screen.textContent = `${this.firstOperand}${this.operator}${this.secondOperand}`;
      return;
    }

    // Both operands and an operator present
    this.secondOperand = this.secondOperand * 10 + num;
    DOM.screen.textContent = `${this.firstOperand}${this.operator}${this.secondOperand}`;
  },

  handleOpClick(e) {
    if (this.operator) return;

    this.operator = e.target.value;
    DOM.screen.textContent = `${this.firstOperand}${this.operator}`;
  },

  handleClearClick() {
    DOM.screen.textContent = "";
    this.resetApp();
  },

  handleSubmitClick() {
    const result = Calculator.operate(
      this.firstOperand,
      this.secondOperand,
      this.operator
    );
    DOM.screen.textContent = result;
    this.resetApp(result);
  },

  startApp() {
    DOM.controlsContainer.addEventListener("click", (e) =>
      this.handleControlClick(e)
    );
  },
};

App.startApp();
