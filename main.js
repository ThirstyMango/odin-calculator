import { DOM } from "./scripts/DOM.js";
import { Calculator } from "./scripts/Calculator.js";

const App = {
  firstOperand: 0,
  operator: null,
  secondOperand: 0,

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
    if (!this.operator) {
      this.firstOperand = this.firstOperand * 10 + parseFloat(e.target.value);
      DOM.screen.textContent = `${this.firstOperand}`;
      return;
    }

    this.secondOperand = this.secondOperand * 10 + parseFloat(e.target.value);
    DOM.screen.textContent = `${this.firstOperand}${this.operator}${this.secondOperand}`;
  },

  handleOpClick(e) {
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
