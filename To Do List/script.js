// Selectors
const title = document.querySelector('.title');
const input = document.querySelector('.input');
const button = document.querySelector('.button');
const list = document.querySelector('.list');
const filterOption = document.querySelector('.filter-todo');
const clearButton = document.querySelector('.clear-btn')
const popUp = document.querySelector('.pop-up');
const date = document.querySelector('.date');

const nameContainer = document.querySelector('.name');
const nameValue = document.querySelector('.name-value');
const nameButton = document.querySelector('.name-btn');
const greet = document.querySelector('.greet');

// Date
const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
};

const today = new Date();
date.innerText = today.toLocaleDateString('en', options);

// Event Listeners
nameButton.addEventListener('click', name);
document.addEventListener('DOMContentLoaded', getTodos);
button.addEventListener('click', add);
list.addEventListener('click', checkCopyDelete);
filterOption.addEventListener('click', filter);
clearButton.addEventListener('click', clear);

// Functions
function name() {
    if (nameValue.value === '') {
        alert('Please enter your name.');
        return;
    }
    nameContainer.classList.add('hide');

    let hour = new Date().getHours();
    console.log(hour);
    if (hour >= 18 || hour < 6) {
        greet.innerText = `Good night, ${nameValue.value}`;
    } else if (hour >= 6 && hour < 12) {
        greet.innerText = `Good morning, ${nameValue.value}`;
    } else if (hour >= 12 && hour < 16) {
        greet.innerText = `Good afternoon, ${nameValue.value}`;
    } else if (hour >= 16 && hour < 18) {
        greet.innerText = `Good evening, ${nameValue.value}`;
    }

    title.innerText = `${nameValue.value}'s To Do List`;
}

function add(e) {
    e.preventDefault();

    if (input.value == '') {
        popUp.classList.add('show');
        setTimeout(function() {
            popUp.classList.remove('show');
        }, 2000);
        return;
    }

    // Create container
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('text-list');

    // Create text
    const text = document.createElement('li');
    text.classList.add('text');

    text.innerText = input.value;

    itemContainer.appendChild(text);

    // Add To Do to a Local Storage
    saveLocalTodos(input.value);

    // Create mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');

    itemContainer.appendChild(completedButton);

    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    copyButton.classList.add('copy-btn');

    itemContainer.appendChild(copyButton);

    // Create trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-times"></i>';
    trashButton.classList.add('trash-btn');

    itemContainer.appendChild(trashButton);

    // Append to List
    list.appendChild(itemContainer);

    // Clear the value of input
    input.value = '';
}

function checkCopyDelete(e) {
    const item = e.target;

    // Check Mark
    if (item.classList[0] === 'complete-btn') {
        const itemContainer = item.parentElement;
        itemContainer.classList.toggle('completed');
    }

    // Copy
    if (item.classList[0] === 'copy-btn') {

         // Create container
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('text-list');

        // Create text
        const text = document.createElement('li');
        text.classList.add('text');

        const copiedText = item.parentElement.children[0].innerText;
        text.innerText = copiedText;

        itemContainer.appendChild(text);

        // Add To Do to a Local Storage
        saveLocalTodos(copiedText);

        // Create mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');

        itemContainer.appendChild(completedButton);

        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.classList.add('copy-btn');

        itemContainer.appendChild(copyButton);

        // Create trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-times"></i>';
        trashButton.classList.add('trash-btn');

        itemContainer.appendChild(trashButton);

        // Append to List
        list.appendChild(itemContainer);
    }

    // Delete
    if (item.classList[0] === 'trash-btn') {
        const itemContainer =  item.parentElement;
        itemContainer.classList.add('fall');

        // Remove from Local Storage
        removeLocalTodos(itemContainer);

        itemContainer.addEventListener('transitionend', function() {
            itemContainer.remove();
        });
    }    
}

function filter(e) {
    const todos = list.childNodes;
    todos.forEach(function(todo) {
        setTimeout(() => {
            if (e.target.value === 'all') {
                todo.style.display = 'flex';
            } else if (e.target.value === 'completed') {
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'; 
                } else {
                    todo.style.display = 'none';
                }
            } else if (e.target.value === 'uncompleted') {
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'; 
                } else {
                    todo.style.display = 'none';
                }
            }
        }, 200);
        
    });
}

function clear() {
    const ask = confirm('Delete all and refresh?');
    if (ask === true) {
        localStorage.removeItem('todos');
        location.reload();
    }
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        // Create container
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('text-list');

        // Create text
        const text = document.createElement('li');
        text.classList.add('text');

        text.innerText = todo;

        itemContainer.appendChild(text);

        // Create mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');

        itemContainer.appendChild(completedButton);

        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.classList.add('copy-btn');

        itemContainer.appendChild(copyButton);

        // Create trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-times"></i>';
        trashButton.classList.add('trash-btn');

        itemContainer.appendChild(trashButton);

        // Append to List
        list.appendChild(itemContainer);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}