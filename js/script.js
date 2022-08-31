function add(numOne, numTwo) {return numOne + numTwo;}

function subtract(numOne, numTwo) {return numOne - numTwo;}

function multiply(numOne, numTwo) {return numOne * numTwo;}

function divide(numOne, numTwo) {
    if (numTwo === 0) {
        const display = document.querySelector("#display");
        display.textContent = 'Div by zero err';
        return;
    }
    return numOne / numTwo;}

function operate(numOne, numTwo, operator) {
    switch (operator) {
        case 'plus':
            return add(numOne, numTwo);
        case 'minus':
            return subtract(numOne, numTwo);
        case 'multiply':
            return multiply(numOne, numTwo);
        case 'divide':
            return divide(numOne, numTwo);
    }
}

let displayNum = [];
let opArr = ['plus', 'minus', 'multiply', 'divide'];
let currentValue = null;
let currentOp = '';

// Key presses by storing each number into an array using push
function pushNum(digit) {
    displayNum.push(digit);
    return displayNum.join('');
}

// Applying operator with different conditions
function applyOperator(operator) {
    // If displaynum is empty IE selecting a different operator
    if (displayNum.length === 0) {
        currentOp = operator;
    } else if (currentValue === null) { //Check if currentValue
        currentValue = parseFloat(displayNum.join(''));
        currentOp = operator;
        displayNum = [];
        pushToDisplay('');
    } else {
        if ((currentOp === 'divide') && (displayNum == 0)) { 
            sendDivZeroError();
            return;
        }
        currentValue = operate(currentValue, parseFloat(displayNum.join('')), currentOp);
        currentOp = operator;
        pushToDisplay(currentValue);
        displayNum = [];
    }

}

// Error response on a div by 0
function sendDivZeroError() {
    clearAll();
    const display = document.querySelector("#display");
    display.textContent = 'Div by zero err';
}

// Push any string to the display div
function pushToDisplay(str) {
    const display = document.querySelector("#display");
    display.textContent = str;
}

// Clear display and reset variables
function clearAll() {
    displayNum = [];
    currentValue = null;
    currentOp = '';
    const display = document.querySelector("#display");
    display.textContent = displayNum;
}

// Equal function to complete operations
function doEqual() {
    if ((currentOp === 'divide') && (displayNum == 0)) { 
        sendDivZeroError();
        return;
    }
    currentValue = operate(currentValue, parseFloat(displayNum.join('')), currentOp);
    pushToDisplay(currentValue);
    displayNum = String(currentValue).split("");
    currentOp = '';
    currentValue = null;
}

// Grab clicks and parse their values
const buttons = document.querySelectorAll(".container button");
buttons.forEach((button => {
    button.addEventListener('click', () => {
        if (parseInt(button.id) >= 0 && parseInt(button.id) <= 9) {
            pushToDisplay(pushNum(button.id));
        } else if (opArr.indexOf(button.id) > -1) {
            applyOperator(button.id);
        } else if (button.id === 'equals') {
            console.log(button.id);
            doEqual();
        } else {
            clearAll();
        }
    })
}));