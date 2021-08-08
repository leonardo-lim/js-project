// Selectors
const container = document.getElementsByClassName('container')[0];
const courseList = document.getElementById('course-list');
const grade = document.getElementById('grade');
const finalScore = document.getElementById('final-score');
const course = document.getElementById('course');
const score = document.getElementById('score');
const credit = document.getElementById('credit');
const addButton = document.getElementById('add');
const checkButton = document.getElementById('check');
const refreshButton = document.getElementById('refresh');

// Arrays
let courses = [];
let scores = [];
let credits = [];
let scoreCount = 0;
let creditCount = 0;

// Event Listeners
addButton.addEventListener('click', addCourse);
checkButton.addEventListener('click', gpaCheck);

// Functions
function addCourse() {
    if (course.value == '' || score.value == '' || credit.value == '') {
        alert('Please fill all the field.');
    } else if (isNaN(score.value) || isNaN(credit.value)) {
        alert('Only numbers are allowed for score and SCU.');
    } else {
        courses.push(course.value);
        scores.push(score.value);
        credits.push(credit.value);

        scoreCount += parseFloat(score.value) * parseFloat(credit.value);
        creditCount += parseFloat(credit.value);

        course.value = '';
        score.value = '';
        credit.value = '';
    }
}

function printData() {
    courseList.innerHTML = '';
    courseList.innerHTML += `<h3>List of Courses</h3>`;
    courseList.classList.add('list');
    courseList.classList.add('scroll');

    for (let i = 0; i < courses.length; i++) {
        courseList.innerHTML += `<div class="text">${courses[i]} ${scores[i]}</div>`;
    }

    let score = scoreCount / creditCount;

    grade.innerHTML = `Grade<br>${gradeCheck(parseInt(score))}`;
    finalScore.innerHTML = `Score<br>${Math.round(score * 100) / 100}`;

    refreshButton.removeAttribute('hidden');
    refreshButton.addEventListener('click', refresh);
}

function gradeCheck(value) {
    let grade;

    if (value >= 90 && value <= 100) grade = 'A';
    else if (value >= 85 && value <= 89) grade = 'A-';
    else if (value >= 80 && value <= 84) grade = 'B+';
    else if (value >= 75 && value <= 79) grade = 'B';
    else if (value >= 70 && value <= 74) grade = 'B-';
    else if (value >= 65 && value <= 69) grade = 'C';
    else if (value >= 50 && value <= 64) grade = 'D';
    else if (value >= 0 && value <= 49) grade = 'E';
    else grade = 'F';

    return grade;
}

function gpaCheck() {
    if (courses.length == 0 && course.value == '' && score.value == '' && credit.value == '') {
        alert('Nothing has been added.');
    } else {
        if (course.value != '' && score.value != '' && credit.value != '') {
            courses.push(course.value);
            scores.push(score.value);
            credits.push(credit.value);
    
            scoreCount += parseFloat(score.value) * parseFloat(credit.value);
            creditCount += parseFloat(credit.value);
        }

        courseList.innerHTML = `<h1>Calculating GPA...</h1>`;
        setTimeout(printData, 1000);
    }
}

function refresh() {
    location.reload();
}