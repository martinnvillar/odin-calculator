// numbers and operators

let firstNumber = '';
let secondNumber = '';
let operator = null;
let resetScreen = false;

// get screen and buttons

const currentOpScreen = document.querySelector('.currentOp');
const previousOpScreen = document.querySelector('.previousOp');
const clearBtn = document.querySelector('.clearBtn');
clearBtn.addEventListener('click', clearScreen);
const deleteBtn = document.querySelector('.deleteBtn');
deleteBtn.addEventListener('click', deleteNumber);
const equal = document.querySelector('.equal');
equal.addEventListener('click', evaluate);
const numBtns = document.querySelectorAll('.numBtns');
const opBtns = document.querySelectorAll('.opBtns');
const dotBtn = document.querySelector('.dotBtn');
dotBtn.addEventListener('click', dot);

// math functions

function add(a, b) {
    return a+b;
};

function substract(a, b) {
    return a-b;
};

function multiply(a, b) {
    return a*b;
};

function divide(a, b) {
    return b/a;
};

// display numbers and operators on screen

numBtns.forEach((btn) => {
    btn.addEventListener('click', () => displayNumber(btn.textContent));
});

function displayNumber (number) {
    if (previousOpScreen.textContent === '0' || resetScreen) {
        screenReset();   
    }
    previousOpScreen.textContent += number;
};

opBtns.forEach((btn) => {
    btn.addEventListener('click', () => displayOperator(btn.textContent));
});

function displayOperator (op) {
    if (operator !== null) evaluate();
    firstNumber = previousOpScreen.textContent;
    operator = op;
    currentOpScreen.textContent = `${firstNumber} ${operator}`;
    resetScreen = true;
};

function dot() {
    if (resetScreen) screenReset();
    if (previousOpScreen.textContent === '') {
        previousOpScreen.textContent = '0';
    }
    if (previousOpScreen.textContent.includes('.')) return;
    previousOpScreen.textContent += '.';
};

function evaluate() {
    if(operator === null || resetScreen) return;
    if(operator === '/' && previousOpScreen.textContent === '0') {
        alert(`You can't divide by zero!`);
        return
    }
    secondNumber = previousOpScreen.textContent;
    previousOpScreen.textContent = roundResult(
        operate(operator, firstNumber, secondNumber)
    )
    currentOpScreen.textContent = `${firstNumber} ${operator} ${secondNumber} = `;
    operator = null;
};

function roundResult(number) {
    return Math.round(number * 100) / 100;
};

function appendPoint() {
    if(resetScreen) screenReset();
    if(previousOpScreen.textContent === '') {
        previousOpScreen.textContent = '0';
    }
    if(previousOpScreen.textContent.includes('.')) return;
    previousOpScreen.textContent += '.'
};

// clear screen

function screenReset() {
    previousOpScreen.textContent = '';
    resetScreen = false;
};

function clearScreen () {
    previousOpScreen.textContent = 0;
    currentOpScreen.textContent = '';
    firstNumber = '';
    secondNumber = '';
};

// delete each number

function deleteNumber () {
    if(previousOpScreen.textContent === '0') return;
    previousOpScreen.textContent = previousOpScreen.textContent
    .toString()
    .slice(0, -1);
};

// operate function

function operate(op, a, b) {
    a = Number(a);
    b = Number(b);
    switch (op) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            if (a === 0) {
                alert(`You can't divide by zero!`)
                screenReset();
            } else {
                return divide(b, a);
            }
        default:
            return null;       
    };
};
