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

function applyOperator(operator) {
    if (currentValue === null) {
        currentValue = displayNum.join('');
        currentOp = operator;
    } else {
        currentValue = operate(currentValue, parseInt(displayNum.join('')), currentOp);
        currentOp = operator;
        pushToDisplay(currentValue);
    }

}

function pushToDisplay(str) {
    const display = document.querySelector("#display");
    display.textContent = str;
}

// Grab clicks and parse their values
const buttons = document.querySelectorAll(".container button");
buttons.forEach((button => {
    button.addEventListener('click', () => {
        if (parseInt(button.id) >= 0 && parseInt(button.id) <= 9) {
            pushToDisplay(pushNum(button.id));
        } else if (opArr.indexOf(button.id) > -1) {
            console.log(button.id);
        } else {
            console.log(button.id);
        }
    })
}));

// Display array into display div
const display = document.querySelector("#display");
// On operator click store number into valueOne and then start adding 
//      to new variable valueTwo