const board = document.getElementById('board');
const cell = document.getElementsByClassName('cell');
const winningMessage = document.querySelector('.winning-message');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click', addSign);
}

restartButton.addEventListener('click', restart);

function random() {
    const randomNumber = Math.random().toFixed(2);

    if (randomNumber > 0 && randomNumber <= 0.5) {
        board.classList.add('x');
    } else {
        board.classList.add('circle');
    }
}

random();

function addSign() {
    if (board.classList.contains('circle') && !this.classList.contains('x')) {
        this.classList.add('circle');
        board.classList.remove('circle');
        board.classList.add('x');
    } else if (board.classList.contains('x') && !this.classList.contains('circle')) {
        this.classList.add('x');
        board.classList.remove('x');
        board.classList.add('circle');
    }

    checkWin();
}

function checkWin() {
    // X Sign
    const px1 = cell[0].classList.contains('x') && cell[1].classList.contains('x') && cell[2].classList.contains('x');
    const px2 = cell[3].classList.contains('x') && cell[4].classList.contains('x') && cell[5].classList.contains('x');
    const px3 = cell[6].classList.contains('x') && cell[7].classList.contains('x') && cell[8].classList.contains('x');
    const px4 = cell[0].classList.contains('x') && cell[3].classList.contains('x') && cell[6].classList.contains('x');
    const px5 = cell[1].classList.contains('x') && cell[4].classList.contains('x') && cell[7].classList.contains('x');
    const px6 = cell[2].classList.contains('x') && cell[5].classList.contains('x') && cell[8].classList.contains('x');
    const px7 = cell[0].classList.contains('x') && cell[4].classList.contains('x') && cell[8].classList.contains('x');
    const px8 = cell[2].classList.contains('x') && cell[4].classList.contains('x') && cell[6].classList.contains('x');

    // Circle Sign
    const pc1 = cell[0].classList.contains('circle') && cell[1].classList.contains('circle') && cell[2].classList.contains('circle');
    const pc2 = cell[3].classList.contains('circle') && cell[4].classList.contains('circle') && cell[5].classList.contains('circle');
    const pc3 = cell[6].classList.contains('circle') && cell[7].classList.contains('circle') && cell[8].classList.contains('circle');
    const pc4 = cell[0].classList.contains('circle') && cell[3].classList.contains('circle') && cell[6].classList.contains('circle');
    const pc5 = cell[1].classList.contains('circle') && cell[4].classList.contains('circle') && cell[7].classList.contains('circle');
    const pc6 = cell[2].classList.contains('circle') && cell[5].classList.contains('circle') && cell[8].classList.contains('circle');
    const pc7 = cell[0].classList.contains('circle') && cell[4].classList.contains('circle') && cell[8].classList.contains('circle');
    const pc8 = cell[2].classList.contains('circle') && cell[4].classList.contains('circle') && cell[6].classList.contains('circle');

    // Draw
    const draw = (cell[0].classList.contains('x') || cell[0].classList.contains('circle')) && (cell[1].classList.contains('x') || cell[1].classList.contains('circle')) && (cell[2].classList.contains('x') || cell[2].classList.contains('circle')) && (cell[3].classList.contains('x') || cell[3].classList.contains('circle')) && (cell[4].classList.contains('x') || cell[4].classList.contains('circle')) && (cell[5].classList.contains('x') || cell[5].classList.contains('circle')) && (cell[6].classList.contains('x') || cell[6].classList.contains('circle')) && (cell[7].classList.contains('x') || cell[7].classList.contains('circle')) && (cell[8].classList.contains('x') || cell[8].classList.contains('circle'));

    if (px1 || px2 || px3 || px4 || px5 || px6 || px7 || px8) {
        winningMessage.classList.add('show');
        message.innerText = 'X Wins!';
    } else if (pc1 || pc2 || pc3 || pc4 || pc5 || pc6 || pc7 || pc8) {
        winningMessage.classList.add('show');
        message.innerText = 'O Wins!';
    } else if (draw) {
        winningMessage.classList.add('show');
        message.innerText = 'It\'s a draw!';
    }    
}

function restart() {
    winningMessage.classList.remove('show');
    message.innerText = '';

    board.classList.remove('x');
    board.classList.remove('circle');
    
    for (let i = 0; i < cell.length; i++) {
        cell[i].classList.remove('x');
        cell[i].classList.remove('circle');
    }

    random();
}