// Selectors
const switchButton = document.querySelector('.btn-switch');

let numButton = document.getElementsByClassName('btn-num');
let operatorButton = document.getElementsByClassName('btn-operator');

const clearButton = document.getElementById('btn-c');
const deleteButton = document.getElementById('btn-del');
const decimalButton = document.getElementById('btn-dec');
const equalButton = document.getElementById('btn-equal');

const previous = document.querySelector('.previous');
const current = document.querySelector('.current');

const history = document.querySelector('.history');
const historyButton = document.querySelector('.btn-history');
const historyClearButton = document.querySelector('.btn-history-c');

let valueContainer = [];
current.innerText = '0';

// Event Listeners
for (i = 0; i < numButton.length; i++) {
    numButton[i].addEventListener('click', outputText);
}

for (i = 0; i < operatorButton.length; i++) {
    operatorButton[i].addEventListener('click', operator);
}

equalButton.addEventListener('click', result);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', del);
decimalButton.addEventListener('click', decimal);
switchButton.addEventListener('change', mode);
historyButton.addEventListener('click', showHistory);
historyClearButton.addEventListener('click', clearHistory);

// Functions
function mode() {
    const background = document.querySelector('.btn-switch').parentElement.parentElement;

    if (this.checked) {
        background.classList.add('light');
        historyButton.style.background = '#0083b0';
    } else {
        background.classList.remove('light');
        historyButton.style.background = 'red';
    }

    if (history.classList.contains('show') && background.classList.contains('light')) {
        historyButton.style.background = '#0083b0';
        historyButton.style.color = 'white';
    } else if (history.classList.contains('show')) {
        historyButton.style.background = 'red';
        historyButton.style.color = 'white';
    }
}

function showHistory() {
    const background = document.querySelector('.btn-switch').parentElement.parentElement;

    history.classList.toggle('show');
    historyButton.classList.toggle('show');
    historyClearButton.classList.toggle('show');
    
    if (history.classList.contains('show') && background.classList.contains('light')) {
        historyButton.style.background = '#0083b0';
        historyButton.style.color = 'white';
        historyButton.innerHTML = '<i class="fa fa-times"></i>';
    } else if (history.classList.contains('show')) {
        historyButton.style.background = 'red';
        historyButton.style.color = 'white';
        historyButton.innerHTML = '<i class="fa fa-times"></i>';
    }  else if (!history.classList.contains('show') && background.classList.contains('light')) {
        historyButton.style.background = '#0083b0';
        historyButton.style.color = 'black';
        historyButton.innerHTML = '<i class="fa fa-history"></i>';
    } else {
        historyButton.style.background = 'red';
        historyButton.style.color = 'black';
        historyButton.innerHTML = '<i class="fa fa-history"></i>';
    }
}

function clearHistory() {
    history.innerText = '';
    history.innerHTML = '';
    
}

function outputText(e) {
    const buttonText = e.target.innerText;

    if (current.innerText === '0' && !e.target.classList.contains('btn-operator')) {
        current.innerText = '';
    }

    current.innerText += buttonText;
}

function clear() {
    current.innerText = '0';
    previous.innerText = '';
    valueContainer = [];
}

function del() {
    if (current.innerText === '0') {
        return;
    }

    const ct = current.innerText;
    
    if (ct === '1' || ct === '2' || ct === '3' || ct === '4' || ct === '5' || ct === '6' || ct === '7' || ct === '8' || ct === '9') {
        current.innerText = '0';
    } else {
        current.innerText = current.innerText.slice(0, -1);

    }
}

function decimal() {
    if (!current.innerText.includes('.')) {
        current.innerText += '.';
    }
}

function operator(e) {
    if (previous.innerText === '' && current.innerText === '0') {
        return;
    }
    
    const previousText = e.target.parentElement.parentElement.children[0].children[0].innerText;
    const lastChar = previousText.slice(-1);

    if ((lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') && current.innerText === '') {
        return;
    }
        
    previous.innerText += current.innerText;

    if (e.target.innerHTML === '<i class="fa fa-plus"></i>') {
        previous.innerText += '+';
    } else if (e.target.innerHTML === '<i class="fa fa-minus"></i>') {
        previous.innerText += '-';
    } else if (e.target.innerHTML === '<i class="fa fa-times"></i>') {
        previous.innerText += '*';
    } else if (e.target.innerHTML === '<i class="fa fa-divide"></i>') {
        previous.innerText += '/';
    }

    current.innerText = '';
    valueContainer = [];
    valueContainer.push(previous.innerText);
}

function result(e) {
    if (previous.innerText === '') {
        return;
    }

    if (previous.innerText === '' && current.innerText === '0') {
        return;
    }

    const previousText = e.target.parentElement.parentElement.children[0].children[0].innerText;
    const lastChar = previousText.slice(-1);

    if ((lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') && current.innerText === '') {
        return;
    }

    valueContainer.push(current.innerText);
    
    history.innerText += previous.innerText;
    history.innerText += current.innerText;
    history.innerHTML += '<br>';
    history.innerText += '=';
    
    current.innerText = eval(valueContainer.join(''));
    
    history.innerText += current.innerText;
    history.innerHTML += '<br><br>';

    previous.innerText = '';
    valueContainer = [];
}