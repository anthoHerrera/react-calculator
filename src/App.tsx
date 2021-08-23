import React from "react";
import Buttons from "./Buttons";
import "./App.scss";

const MAX_LENGTH = 21;
const isOperator = /[x/+‑]/;
const endsWithOperator = /[x+‑/]$/;
const endsWithNegativeSign = /\d[x/+‑]{1}‑$/;

type AppProps = {};

type AppState = {
    prevVal: string;
    currentValue: string;
    formula: string;
    currentSign: string;
    evaluated: boolean;
};

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            prevVal: "0",
            currentValue: "0",
            formula: String.fromCharCode(160),
            currentSign: "pos",
            evaluated: false,
        };
        this.clear = this.clear.bind(this);
        this.maxDigit = this.maxDigit.bind(this);
        this.handleNumbers = this.handleNumbers.bind(this);
        this.handleOperators = this.handleOperators.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);
        this.handleEvaluate = this.handleEvaluate.bind(this);
    }

    clear() {
        this.setState({
            prevVal: "0",
            currentValue: "0",
            formula: String.fromCharCode(160),
            currentSign: "pos",
            evaluated: false,
        });
    }

    maxDigit() {
        this.setState({
            currentValue: "Max Digit Limit",
            prevVal: this.state.currentValue,
        });
        setTimeout(
            () => this.setState({ currentValue: this.state.prevVal }),
            1000
        );
    }

    handleNumbers(e: any): void {
        if (!this.state.currentValue.includes("Limit")) {
            const { currentValue, formula, evaluated } = this.state;
            const number = e.target.value;
            this.setState({ evaluated: false });
            if (currentValue.length > MAX_LENGTH) {
                this.maxDigit();
            } else if (evaluated) {
                this.setState({
                    currentValue: number,
                    formula: number !== "0" ? number : "",
                });
            } else {
                this.setState({
                    currentValue:
                        currentValue === "0" || isOperator.test(currentValue)
                            ? number
                            : currentValue + number,
                    formula:
                        currentValue === "0" && number === "0"
                            ? formula === ""
                                ? number
                                : formula
                            : /([^.0-9]0|^0)$/.test(formula)
                            ? formula.slice(0, -1) + number
                            : formula + number,
                });
            }
        }
    }

    handleOperators(e: any): void {
        if (!this.state.currentValue.includes("Limit")) {
            const operator = e.target.value;
            const { formula, prevVal, evaluated } = this.state;
            this.setState({ currentValue: operator, evaluated: false });
            if (evaluated) {
                this.setState({ formula: prevVal + operator });
            } else if (!endsWithOperator.test(formula)) {
                this.setState({
                    prevVal: formula,
                    formula: formula + operator,
                });
            } else if (!endsWithNegativeSign.test(formula)) {
                this.setState({
                    formula:
                        (endsWithNegativeSign.test(formula + operator)
                            ? formula
                            : prevVal) + operator,
                });
            } else if (operator !== "‑") {
                this.setState({
                    formula: prevVal + operator,
                });
            }
        }
    }

    handleDecimal(): void {
        if (this.state.evaluated === true) {
            this.setState({
                currentValue: "0.",
                formula: "0.",
                evaluated: false,
            });
        } else if (
            !this.state.currentValue.includes(".") &&
            !this.state.currentValue.includes("Limit")
        ) {
            this.setState({ evaluated: false });
            if (this.state.currentValue.length > 21) {
                this.maxDigit();
            } else if (
                endsWithOperator.test(this.state.formula) ||
                (this.state.currentValue === "0" && this.state.formula === "")
            ) {
                this.setState({
                    currentValue: "0.",
                    formula: this.state.formula + "0.",
                });
            } else {
                this.setState({
                    currentValue:
                        this.state.formula.match(/(-?\d+\.?\d*)$/)![0] + ".",
                    formula: this.state.formula + ".",
                });
            }
        }
    }

    handleEvaluate() {
        if (!this.state.currentValue.includes("Limit")) {
            let expression = this.state.formula;
            while (endsWithOperator.test(expression)) {
                expression = expression.slice(0, -1);
            }
            expression = expression
                .replace(/x/g, "*")
                .replace(/‑/g, "-")
                .replace("--", "+0+0+0+0+0+0+");
            let answer =
                Math.round(1000000000000 * eval(expression)) / 1000000000000;
            this.setState({
                currentValue: answer.toString(),
                formula:
                    expression
                        .replace(/\*/g, "⋅")
                        .replace(/-/g, "‑")
                        .replace("+0+0+0+0+0+0+", "‑-")
                        .replace(/(x|\/|\+)‑/, "$1-")
                        .replace(/^‑/, "-") +
                    "=" +
                    answer,
                prevVal: answer.toString(),
                evaluated: true,
            });
        }
    }

    render() {
        return (
            <div id="app">
                <div className="calculator">
                    <div className="operation">{this.state.formula}</div>
                    <div className="result" id="display">
                        {this.state.currentValue}
                    </div>
                    <Buttons
                        numbers={this.handleNumbers}
                        clear={this.clear}
                        operators={this.handleOperators}
                        decimal={this.handleDecimal}
                        equals={this.handleEvaluate}
                    />
                </div>
            </div>
        );
    }
}

export default App;
