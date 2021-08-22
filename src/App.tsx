import React from "react";
import Buttons from "./Buttons";
import "./App.scss";

const MAX_LENGTH = 21;
const isOperator = /[x/+‑]/;
const endsWithOperator = /[x+‑/]$/;

type AppProps = {};

type AppState = {
    currentValue: string;
    result: string;
};

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            currentValue: String.fromCharCode(160),
            result: "0",
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (text: string): void => {
        if (isOperator.test(text)) {
            this.setState({
                currentValue: this.state.currentValue + text,
                result: text,
            });
        } else if (!isOperator.test(text)) {
            if (text !== "=" && text !== "." && text !== "AC") {
                this.setState({
                    currentValue: this.state.currentValue + text,
                    result: !isOperator.test(this.state.result)
                        ? this.state.result.length === 1 &&
                          this.state.result === "0"
                            ? text
                            : this.state.result + text
                        : text,
                });
            }else if(text === "AC") {
                this.setState({
                    currentValue: String.fromCharCode(160),
                    result: '0',
                })
            }
        }
    };

    render() {
        return (
            <div id="app">
                <div className="calculator">
                    <div className="operation">{this.state.currentValue}</div>
                    <div className="result" id="display">
                        {this.state.result}
                    </div>
                    <Buttons updateDisplay={this.handleClick} />
                </div>
            </div>
        );
    }
}

export default App;
