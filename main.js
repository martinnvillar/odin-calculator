// get screen and buttons

let currentNumber = '';
let previousNumber = '';
let operator = '';

let previousDisplay = document.querySelector('.previousOp');
let currentOpDisplay = document.querySelector('.currentOp');

const btnNum = document.querySelectorAll('.numBtns');
const operators = document.querySelectorAll('.opBtns')
const rmvOp = document.querySelectorAll('.rmvBtn');
const equalBtn = document.querySelector('.equal');
equalBtn.addEventListener('click', calculate);

// display values and operator

btnNum.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        handleNumber(e.target.textContent);
    });
});

function handleNumber (number) {
    if (currentNumber.length <= 12) {
        currentNumber += number;
        previousDisplay.textContent = currentNumber;
    }
};

operators.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.textContent);
    });
});

function handleOperator (op) {
    operator = op;
    previousNumber = currentNumber;
    currentOpDisplay.textContent = previousNumber + ' ' + operator;
    currentNumber = '';
    previousDisplay.textContent = '';
};

// calculate


function calculate() {
    previousNumber = Number(previousNumber);
    currentNumber = Number(currentNumber);
    
    if (operator === '+') {
        previousNumber += currentNumber;
    } else if (operator === '-') {
        previousNumber -= currentNumber;
    } else if (operator === '/') {
        if (currentNumber <= 0) {
            previousNumber = 'Syntax Error'
            currentOpDisplay.textContent = '';
            previousDisplay.textContent = previousNumber;
            operator = '';
            return;
        }
        previousNumber /= currentNumber;
    } else if (operator === 'x') {
        previousNumber*=currentNumber;
    }
    previousNumber = previousNumber.toString();
    currentOpDisplay.textContent = '';
    previousDisplay.textContent = previousNumber;
}

