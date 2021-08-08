function clock() {
    const hour = document.getElementById('hour');
    const minute = document.getElementById('minute');
    const second = document.getElementById('second');
    const miliSecond = document.getElementById('milisecond');

    const time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    let ms = Math.floor((time.getMilliseconds()) / 10);
    
    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;
    s = (s < 10) ? '0' + s : s;
    ms = (ms < 10) ? '0' + ms : ms;

    hour.innerHTML = h;
    minute.innerHTML = m;
    second.innerHTML = s;
    miliSecond.innerHTML = ms;
}

setInterval(clock, 10);

function day() {
    const mon = document.querySelector('.mon');
    const tue = document.querySelector('.tue');
    const wed = document.querySelector('.wed');
    const thu = document.querySelector('.thu');
    const fri = document.querySelector('.fri');
    const sat = document.querySelector('.sat');
    const sun = document.querySelector('.sun');

    const day = new Date();
    const d = day.toLocaleString('en', {weekday: 'short'});

    if (d === 'Mon') {mon.classList.add('glow')}
    if (d === 'Tue') {tue.classList.add('glow')}
    if (d === 'Wed') {wed.classList.add('glow')}
    if (d === 'Thu') {thu.classList.add('glow')}
    if (d === 'Fri') {fri.classList.add('glow')}
    if (d === 'Sat') {sat.classList.add('glow')}
    if (d === 'Sun') {sun.classList.add('glow')}
}

day();

const button = document.querySelector('.button');
button.addEventListener('click', msButton);

function msButton() {
    const miliSecond = document.getElementById('milisecond').parentElement;
    
    miliSecond.classList.toggle('hide');

    if (miliSecond.classList.contains('hide')) {
        button.style.background = '#ff006a';
        button.style.color = 'white';
        button.innerText = 'show ms';
    } else {
        button.style.background = 'greenyellow';
        button.style.color = 'black';
        button.innerText = 'hide ms';
    }
}