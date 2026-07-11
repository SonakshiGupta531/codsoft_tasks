const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";
function updateDisplay() {
    display.value = expression;
}
function calculate() {
    try {
        const result = eval(expression);

        if (result === Infinity || result === -Infinity) {
            display.value = "Cannot divide by zero";
            expression = "";
        } else {
            expression = result.toString();
            updateDisplay();
        }
    } catch {
        display.value = "Error";
        expression = "";
    }
}
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        switch (value) {
            case "AC":
                expression = "";
                updateDisplay();
                break;

            case "DEL":
                expression = expression.slice(0, -1);
                updateDisplay();
                break;

            case "=":
                calculate();
                break;

            default:
                expression += value;
                updateDisplay();
        }
    });
});
document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (!isNaN(key)) {
        expression += key;
        updateDisplay();
    }
        else if (["+", "-", "*", "/", "%", "."].includes(key)) {
        expression += key;
        updateDisplay();
    }
    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    }
    else if (key === "Backspace") {
        expression = expression.slice(0, -1);
        updateDisplay();
    }
    else if (key === "Escape") {
        expression = "";
        updateDisplay();
    }
});