const input = document.getElementById('input');
const resultOfLetter = document.getElementById('letter-result');
const resultOfSpace = document.getElementById('space-result');

input.addEventListener('keyup', count);

function count() {
    let letters = input.value.split('');
    let spaceCount = 0;
    let letterCount = 0;
    
    if (input.value === '') {
        resultOfSpace.value = 0;
        resultOfLetter.value = 0;
    }

    for (let i = 0; i < letters.length; i++) {
        if (letters[i] === ' ') {
            spaceCount++;
            resultOfSpace.value = spaceCount;
        }
        
        if (letters[i] !== ' ') {
            letterCount++;
            resultOfLetter.value = letterCount;
        }
    }
}