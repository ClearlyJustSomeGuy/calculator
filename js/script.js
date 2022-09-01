function add(numOne, numTwo) {return numOne + numTwo;}

function subtract(numOne, numTwo) {return numOne - numTwo;}

function multiply(numOne, numTwo) {return numOne * numTwo;}

function divide(numOne, numTwo) {
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
let opArr = ['plus', 'minus', 'multiply', 'divide', '+', '-', '*', '/'];
let currentValue = null;
let currentOp = '';

// Key presses by storing each number into an array using push
function pushNum(digit) {
    displayNum.push(digit);
    displayNum = limitDisplayLength(displayNum);
    return displayNum.join('');
}

// Applying operator with different conditions
function applyOperator(operator) {
    // If displaynum is empty IE selecting a different operator
    if (displayNum.length === 0) {
        currentOp = operator;
        pushToDisplay(opArr[opArr.indexOf(operator) + 4]);
    } else if (currentValue === null) { //Check if currentValue
        currentValue = parseFloat(displayNum.join(''));
        currentOp = operator;
        displayNum = [];
        pushToDisplay(opArr[opArr.indexOf(operator) + 4]);
    } else {
        if ((currentOp === 'divide') && (displayNum == 0)) { 
            sendDivZeroError();
            return;
        }
        currentValue = operate(currentValue, parseFloat(displayNum.join('')), 
                        currentOp);
        currentOp = operator;
        currentValue = trimLength(String(currentValue));
        if (currentValue === 'LENGTH ERR') {
            pushToDisplay(currentValue);
            return;
        } else {
            currentValue = parseFloat(currentValue);
        }
        pushToDisplay(currentValue);
        displayNum = [];
    }

}

// Error response on a div by 0
function sendDivZeroError() {
    clearAll();
    const display = document.querySelector("#display");
    display.textContent = 'ERR, DIV ZERO';
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
    } else if (displayNum.length === 0 || currentOp.length === 0) {
        return;
    }
    currentValue = operate(currentValue, parseFloat(displayNum.join('')), currentOp);
    currentValue = trimLength(String(currentValue));
    if (currentValue === 'LENGTH ERR') {
        pushToDisplay(currentValue);
        return;
    } else {
        currentValue = parseFloat(currentValue);
    }
    pushToDisplay(currentValue);
    displayNum = String(currentValue).split("");
    currentOp = '';
    currentValue = null;
}


function limitDisplayLength(arr) {
    if (arr.length > 13) {
        arr.shift();
        return arr;
    }
    return arr;
}

function trimLength(arr) {
    // Check if > 13 and has decimal
    if (arr.indexOf('.') > 12 || arr.length > 13) {
        return 'LENGTH ERR';
    } else if (arr.length > 13 && arr.indexOf('.') > -1) {
        let trim  = arr.length - 13;
        let decimals = arr.length - arr.indexOf('.') - 1;
        let round = decimals - trim;
        console.log(`length = ${arr.length}, trim = ${trim}, decimals = ${decimals}, round = ${round}, new length = ${parseFloat(arr).toFixed(round).length}`);
        return parseFloat(arr).toFixed(round);
    }
    return arr;
}





// ******************** Listeners **************************
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


// Keyboard entry
document.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (e.key >= 0 && e.key <=9) {
        document.getElementById(`${e.key}`).click();
    } else if (opArr.indexOf(e.key) > -1) {
        applyOperator(opArr[opArr.indexOf(e.key) - 4]);
    } else if ((e.key === '=') || (e.key === 'Enter')) {
        doEqual();
    } else if (e.key === 'Escape') {
        clearAll();
    }
});