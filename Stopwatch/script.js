const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

const time = document.querySelector('.time');
const lapText = document.getElementById('lap-text');
const lapTime = document.getElementById('lap-time');

const h = document.getElementById('hour');
const m = document.getElementById('minute');
const s = document.getElementById('second');
const ms = document.getElementById('milisecond');

let msCount = 0, sCount = 0, mCount = 0, hCount = 0;
let lapCount = 0;
let interval;
let status = 'stopped';
let initialStatus = 'show';

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
document.body.addEventListener('keyup', checkKeyCode);

function checkKeyCode(e) {
    if (e.keyCode === 32) {
        startStop();
    }

    if (e.keyCode === 76 && status === 'started') {
        lap();
    }

    if (e.keyCode === 82 && status === 'stopped') {
        reset();
    }
}

function startStop() {
    if (initialStatus === 'show') {
        msCount= '0' + msCount;
        sCount = '0' + sCount;
        mCount = '0' + mCount;
        hCount = '0' + hCount;
    }

    if (status === 'stopped') {
        status = 'started';
        initialStatus = 'hide';
        interval = setInterval(stopwatch, 10);
        startStopButton.innerHTML = '<i class="fa fa-pause"></i>';
        resetButton.setAttribute('disabled', '');
        lapButton.removeAttribute('disabled');
    } else {
        status = 'stopped';
        initialStatus = 'hide';
        clearInterval(interval);
        startStopButton.innerHTML = '<i class="fa fa-play"></i>';
        resetButton.removeAttribute('disabled');
        lapButton.setAttribute('disabled', '');
    }
}

function stopwatch() {
    msCount++;
    msCount = (msCount < 10) ? '0' + msCount : msCount;

    if (msCount / 100 === 1) {
        msCount = 0;
        msCount = '0' + msCount;
        sCount++;
        sCount = (sCount < 10) ? '0' + sCount : sCount;

        if (sCount / 60 === 1) {
            sCount = 0;
            sCount = '0' + sCount;
            mCount++;
            mCount = (mCount < 10) ? '0' + mCount : mCount;

            if (mCount/ 60 === 1) {
                mCount = 0;
                mCount = '0' + mCount;
                hCount++;
                hCount = (hCount < 10) ? '0' + hCount : hCount;
            }
        }
    }

    ms.innerText = msCount;
    s.innerText = sCount; 
    m.innerText = mCount;
    h.innerText = hCount;
}

function lap() {
    lapCount++;
    
    time.classList.add('slide-left');
    lapText.classList.add('show-lap-text');

    const eachLapTime = document.createElement('div');
    lapTime.appendChild(eachLapTime);

    if (lapCount < 10) {
        eachLapTime.innerText += `${lapCount}. \xa0 ${h.innerText} : ${m.innerText} : ${s.innerText}. ${ms.innerText}`;
        eachLapTime.classList.add('show-lap-time');
    } else {
        eachLapTime.innerText += `${lapCount}. ${h.innerText} : ${m.innerText} : ${s.innerText}. ${ms.innerText}`;
        eachLapTime.classList.add('show-lap-time');
    }
}

function reset() {
    status = 'stopped';
    initialStatus = 'show';
    clearInterval(interval);
    startStopButton.innerHTML = '<i class="fa fa-play"></i>';
    lapButton.setAttribute('disabled', '');
    resetButton.setAttribute('disabled', '');
    
    time.classList.remove('slide-left');
    lapText.classList.remove('show-lap-text');
    lapTime.classList.remove('show-lap-time');
    
    msCount = 0, sCount = 0, mCount = 0, hCount = 0;
    lapCount = 0;
    ms.innerText = '00';
    s.innerText = '00';
    m.innerText = '00';
    h.innerText = '00';
    lapTime.innerText = '';
}