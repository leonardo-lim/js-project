const tempList = document.getElementById('temperature');
const input = document.getElementById('input');
const tempNameText = document.getElementById('temp-name');

const firstResult = document.getElementById('first-result');
const secondResult = document.getElementById('second-result');
const thirdResult = document.getElementById('third-result');

const firstTempName = document.getElementById('first-temp-name');
const secondTempName = document.getElementById('second-temp-name');
const thirdTempName = document.getElementById('third-temp-name');

input.addEventListener('input', temperature);
tempList.addEventListener('change', temperature);

function temperature() {
    const tempName = tempList.options[tempList.selectedIndex].value;
    
    if (!isNaN(input.value) && input.value != '') {
        if (tempName === 'celsius') {
            celsius();
            tempNameText.innerText = '°C';
        } else if (tempName === 'reamur') {
            reamur();
            tempNameText.innerText = '°R';
        } else if (tempName === 'fahrenheit') {
            fahrenheit();
            tempNameText.innerText = '°F';
        } else if (tempName === 'kelvin') {
            kelvin();
            tempNameText.innerText = 'K';
        }
    } else if (input.value === '-') {
        return;
    } else if (input.value === '') {
        tempNameText.innerHTML = '';
        firstResult.innerHTML = '';
        secondResult.innerHTML = '';
        thirdResult.innerHTML = '';
        firstTempName.innerHTML = '';
        secondTempName.innerHTML = '';
        thirdTempName.innerHTML = '';
    } else {
        alert('Input a valid number.');
        input.value = '';
        firstResult.innerHTML = '';
        secondResult.innerHTML = '';
        thirdResult.innerHTML = '';
        firstTempName.innerHTML = '';
        secondTempName.innerHTML = '';
        thirdTempName.innerHTML = '';
    }
}

function celsius() {
    let rResult = input.value * 4 / 5; 
    rResult = Math.round(rResult * 100) / 100;
    let fResult = (input.value * 9 / 5) + 32;
    fResult = Math.round(fResult * 100) / 100;
    let kResult = +(input.value) + 273.15;
    kResult = Math.round(kResult * 100) / 100;

    tempNameText.innerText = '°C';
    firstResult.innerText = rResult;
    firstTempName.innerText = '°R'
    secondResult.innerText = fResult;
    secondTempName.innerText = '°F'
    thirdResult.innerText = kResult;
    thirdTempName.innerText = 'K';
}

function reamur() {
    let cResult = input.value * 5 / 4;
    cResult = Math.round(cResult * 100) / 100;
    let fResult = (input.value * 9 / 4) + 32;
    fResult = Math.round(fResult * 100) / 100;
    let kResult = +(input.value * 5 / 4) + 273.15;
    kResult = Math.round(kResult * 100) / 100;

    tempNameText.innerText = '°R';
    firstResult.innerText = cResult;
    firstTempName.innerText = '°C'
    secondResult.innerText = fResult;
    secondTempName.innerText = '°F'
    thirdResult.innerText = kResult;
    thirdTempName.innerText = 'K';
}

function fahrenheit() {
    let cResult = (input.value - 32) * 5 / 9;
    cResult = Math.round(cResult * 100) / 100;
    let rResult = (input.value - 32) * 4 / 9;
    rResult = Math.round(rResult * 100) / 100;    
    let kResult = +((input.value - 32) * 5 / 9) + 273.15;
    kResult = Math.round(kResult * 100) / 100;

    tempNameText.innerText = '°F';
    firstResult.innerText = cResult;
    firstTempName.innerText = '°C'
    secondResult.innerText = rResult;
    secondTempName.innerText = '°R'
    thirdResult.innerText = kResult;
    thirdTempName.innerText = 'K';
}

function kelvin() {
    let cResult = +(input.value) - 273.15;
    cResult = Math.round(cResult * 100) / 100;
    let rResult = +(input.value - 273.15) * 4 / 5;
    rResult = Math.round(rResult * 100) / 100;    
    let fResult = +((input.value - 273.15) * 9 / 5) + 32;
    fResult = Math.round(fResult * 100) / 100;

    tempNameText.innerText = 'K';
    firstResult.innerText = cResult;
    firstTempName.innerText = '°C'
    secondResult.innerText = rResult;
    secondTempName.innerText = '°R'
    thirdResult.innerText = fResult;
    thirdTempName.innerText = '°F';
}