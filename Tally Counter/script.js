const decreaseButton = document.getElementById('decrease');
const increaseButton = document.getElementById('increase');
const number = document.getElementById('number');
const resetButton = document.getElementById('reset');

decreaseButton.addEventListener('click', decreaseNumber);
increaseButton.addEventListener('click', increaseNumber);
resetButton.addEventListener('click', reset);

function decreaseNumber() {
    if (number.value === '0') {
        number.value = 0;
    } else {
        number.value--;
    }
}

function increaseNumber() {
    number.value++;
}

function reset() {
    resetButton.classList.add('spin');
    number.value = 0;
    
    setTimeout(() => {
        resetButton.classList.remove('spin')
    }, 300);
}