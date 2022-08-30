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
        case '+':
            return add(numOne, numTwo);
        case '-':
            return subtract(numOne, numTwo);
        case '*':
            return multiply(numOne, numTwo);
        case '/':
            return divide(numOne, numTwo);
    }
}

let displayNum = [];
let opArr = ['plus', 'minus', 'multiply', 'divide'];

// Key presses by storing each number into an array using push
function pushNumDisplay(digit) {
    displayNum.push(digit);
    const display = document.querySelector("#display");
    display.textContent = displayNum.join('');

}


// Grab clicks and parse their values
const buttons = document.querySelectorAll(".container button");
buttons.forEach((button => {
    button.addEventListener('click', () => {
        if (parseInt(button.id) >= 0 && parseInt(button.id) <= 9) {
            pushNumDisplay(button.id);
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