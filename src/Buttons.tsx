import React from "react";

type ButtonsProps = {
    updateDisplay: (text: string) => void;
};

function Buttons(props: ButtonsProps) {
    function onClickHandler(e: any): void {
        e.preventDefault();
        props.updateDisplay(e.target.value);
    }

    return (
        <div>
            <div id="buttons">
                <button id="clear" value="AC" onClick={onClickHandler}>
                    AC
                </button>
                <button id="divide" value="/" onClick={onClickHandler}>
                    /
                </button>
                <button id="multiply" value="x" onClick={onClickHandler}>
                    X
                </button>
                <button id="seven" value="7" onClick={onClickHandler}>
                    7
                </button>
                <button id="eight" value="8" onClick={onClickHandler}>
                    8
                </button>
                <button id="nine" value="9" onClick={onClickHandler}>
                    9
                </button>
                <button id="subtract" value="-" onClick={onClickHandler}>
                    -
                </button>
                <button id="four" value="4" onClick={onClickHandler}>
                    4
                </button>
                <button id="five" value="5" onClick={onClickHandler}>
                    5
                </button>
                <button id="six" value="6" onClick={onClickHandler}>
                    6
                </button>
                <button id="add" value="+" onClick={onClickHandler}>
                    +
                </button>
                <button id="one" value="1" onClick={onClickHandler}>
                    1
                </button>
                <button id="two" value="2" onClick={onClickHandler}>
                    2
                </button>
                <button id="three" value="3" onClick={onClickHandler}>
                    3
                </button>
                <button id="zero" value="0" onClick={onClickHandler}>
                    0
                </button>
                <button id="decimal" value="." onClick={onClickHandler}>
                    .
                </button>
                <button id="equals" value="=" onClick={onClickHandler}>
                    =
                </button>
            </div>
        </div>
    );
}

export default Buttons;
