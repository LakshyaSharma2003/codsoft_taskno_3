document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    let currentInput = "0";
    let previousInput = "";
    let operator = "";

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const action = button.getAttribute("data-action");
            const value = button.getAttribute("data-value");

            if (action) {
                handleOperator(action);
            } else if (value) {
                handleInput(value);
            }
            updateDisplay();
        });
    });

    function handleInput(value) {
        if (currentInput === "0" && value !== ".") {
            currentInput = value;
        } else {
            if (value === "." && currentInput.includes(".")) return;
            currentInput += value;
        }
    }

    function handleOperator(action) {
        switch (action) {
            case "clear":
                currentInput = "0";
                previousInput = "";
                operator = "";
                break;
            case "backspace":
                currentInput = currentInput.slice(0, -1) || "0";
                break;
            case "add":
            case "subtract":
            case "multiply":
            case "divide":
                if (operator) {
                    calculate();
                }
                previousInput = currentInput;
                currentInput = "0";
                operator = action;
                break;
            case "equals":
                if (operator) {
                    calculate();
                    operator = "";
                }
                break;
        }
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case "add":
                result = prev + current;
                break;
            case "subtract":
                result = prev - current;
                break;
            case "multiply":
                result = prev * current;
                break;
            case "divide":
                result = prev / current;
                break;
        }

        currentInput = result.toString();
        previousInput = "";
    }

    function updateDisplay() {
        display.textContent = currentInput;
    }
});
