// Selectors
const courseInput = document.getElementById('course-input');
const compInput = document.getElementById('comp-input');
const addCourseButton = document.getElementById('add-course');
const checkButton = document.getElementById('check');
const refreshButton = document.getElementById('refresh');
const grade = document.getElementById('grade');
const finalScore = document.getElementById('final-score');
const footer = document.getElementById('footer');

// Arrays & Variables
let currentCourse;
let currentComp = 0;
let currentPercent = 0;
let total = 0;
let courses = [];
let credits = [];
let components = [];
let percents = [];
let scores = [];
let totals = [];

// Event Listeners
addCourseButton.addEventListener('click', addCourse);
checkButton.addEventListener('click', gpaCheck);
refreshButton.addEventListener('click', refresh);

// Functions
function addCourse() {
    addCourseButton.classList.add('dis');
    addCourseButton.disabled = true;
    checkButton.classList.add('dis');
    checkButton.disabled = true;

    courseInput.innerHTML = `
        <input type="text" id="course" placeholder="Course">
        <input type="number" min="0" id="credit" placeholder="SCU">
        <button type="button" id="yes"><i class="fa fa-check"></i></button>
    `;

    const yesButton = document.getElementById('yes');
    yesButton.addEventListener('click', addComponent);
}

function addComponent() {
    if (addCourseButton.disabled == false) {
        addCourseButton.classList.add('dis');
        addCourseButton.disabled = true;
    }

    const course = document.getElementById('course');
    const credit = document.getElementById('credit');

    if (course.value == '' || credit.value == '') {
        alert('Please fill all the field.');
    } else {
        currentCourse = course.value;
        courses.push(course.value);
        credits.push(credit.value);

        if (currentComp > 1) {
            courseInput.innerHTML = `
                <h1>${currentCourse}'s Course</h1>
                <h3>Added Component<br>${currentComp} items</h3>
                <h3>Current Percentage<br>${currentPercent}%</h3>
            `;
        } else {
            courseInput.innerHTML = `
                <h1>${currentCourse}'s Course</h1>
                <h3>Added Component<br>${currentComp} item</h3>
                <h3>Current Percentage<br>${currentPercent}%</h3>
            `;
        }

        compInput.innerHTML = `
            <input type="text" id="component" placeholder="Component">
            <input type="number" min="0" max="100" id="percent" placeholder="Percentage">
            <input type="number" min="0" max="100" id="score" placeholder="Score">
            <button type="button" id="addComp"><i class="fa fa-plus"></i> Add Component</button>
            <button type="button" id="done"><i class="fa fa-check"></i> Done</button>
        `;
            
        const addCompButton = document.getElementById('addComp');
        const doneButton = document.getElementById('done');

        addCompButton.addEventListener('click', addMore);
        doneButton.addEventListener('click', done);
    }
}

function addMore() {
    const comp = document.getElementById('component');
    const percent = document.getElementById('percent');
    const score = document.getElementById('score');

    if (comp.value == '' || percent.value == '' || score.value == '') {
        alert('Please fill all the field.');
    } else if (currentPercent + parseInt(percent.value) > 100) {
        alert('Sorry, percentage exceeds 100%.');
        comp.value = '';
        percent.value = '';
        score.value = '';
    } else {
        components.push(comp.value);
        percents.push(percent.value);
        scores.push(score.value);

        currentComp++;
        currentPercent += parseInt(percent.value);
        total += ((percent.value * score.value) / 100);

        comp.value = '';
        percent.value = '';
        score.value = '';

        if (currentComp > 1) {
            courseInput.innerHTML = `
                <h1>${currentCourse}'s Course</h1>
                <h3>Added Component<br>${currentComp} items</h3>
                <h3>Current Percentage<br>${currentPercent}%</h3>
            `;
        } else {
            courseInput.innerHTML = `
                <h1>${currentCourse}'s Course</h1>
                <h3>Added Component<br>${currentComp} item</h3>
                <h3>Current Percentage<br>${currentPercent}%</h3>
            `;
        }
    }
}

function done() {
    const comp = document.getElementById('component');
    const percent = document.getElementById('percent');
    const score = document.getElementById('score');

    if (components.length == 0 || comp.value != '' || percent.value != '' || score.value != '') {
        alert('Please add the component first.');
    } else if (currentPercent < 100) {
        alert('Please fill the field until 100%.');  
    } else {
        courseInput.innerHTML = `<h1>${currentCourse} added.</h1>`;
        compInput.innerHTML = '';

        totals.push((Math.round(total * 100) / 100).toFixed(2));
        total = 0;
        currentComp = 0;
        currentPercent = 0;

        components = [];
        percents = [];
        scores = [];

        addCourseButton.classList.remove('dis');
        addCourseButton.disabled = false;
        checkButton.classList.remove('dis');
        checkButton.disabled = false;
    }
}

function printData() {
    addCourseButton.style.display = 'none';
    checkButton.style.display = 'none';
    courseInput.classList.add('slide');
    
    courseInput.innerHTML = '';
    courseInput.innerHTML += `<h1>List of Courses</h1>`;

    for (let i = 0; i < courses.length; i++) {
        courseInput.innerHTML += `<div id="text">${courses[i]} ${totals[i]}</div>`;
    }

    grade.classList.add('show');
    finalScore.classList.add('show');

    grade.innerHTML = `
        <div id="text">Grade</div>
        <div id="value">${gradeCheck()}</div>
    `;

    finalScore.innerHTML = `
        <div id="text">GPA</div>
        <div id="value">${scoreCheck()}</div>
    `;

    refreshButton.classList.remove('hide');
}

function gradeCheck() {
    let grade;
    let value = scoreCheck();

    if (value >= 4) grade = 'A';
    else if (value >= 3.67) grade = 'A-';
    else if (value >= 3.33) grade = 'B+';
    else if (value >= 3) grade = 'B';
    else if (value >= 2.5) grade = 'B-';
    else if (value >= 2) grade = 'C';
    else if (value >= 1) grade = 'D';
    else grade = 'F';

    return grade;
}

function scoreCheck() {
    let current;
    let point = 0.0;
    let totalCredit = 0;

    for (let i = 0; i < totals.length; i++) {
        if (totals[i] > 89 && totals[i] <= 100) current = 4.0;
        else if (totals[i] > 84 && totals[i] <= 89) current = 3.67;
        else if (totals[i] > 79 && totals[i] <= 84) current = 3.33;
        else if (totals[i] > 74 && totals[i] <= 79) current = 3.0;
        else if (totals[i] > 69 && totals[i] <= 74) current = 2.5;
        else if (totals[i] > 64 && totals[i] <= 69) current = 2.0;
        else if (totals[i] > 49 && totals[i] <= 64) current = 1.0;
        else current = 0.0;

        point += (credits[i] * current);
    }
    
    for (let i = 0; i < credits.length; i++) {
        totalCredit += parseInt(credits[i]);
    }

    let result = (Math.round((point / totalCredit) * 100) / 100).toFixed(2);

    return result;
}

function gpaCheck() {
    checkButton.classList.add('dis');
    checkButton.disabled = true;
    addCourseButton.classList.add('dis');
    addCourseButton.disabled = true;
    courseInput.innerHTML = `<h1>Calculating GPA...</h1>`;
    setTimeout(printData, 500);
}

function refresh() {
    location.reload();
}

footer.innerHTML += `Copyright &copy; ${new Date().getFullYear()}. All rights reserved.`;