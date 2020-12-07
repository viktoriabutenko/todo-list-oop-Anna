// define variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('#clear-tasks');
const filterInput = document.querySelector('#filter');

// define event listeners
// page reload event - get data from local storage
document.addEventListener('DOMContentLoaded', getTasks);
// add task to list - submit button
form.addEventListener('submit', addTask);
// remove task from list - fas fa-backspace icon
taskList.addEventListener('click', removeTask);
// clear tasks list
clearBtn.addEventListener('click', clearTasks);
// filter task from list
filterInput.addEventListener('keyup', filterTasks);

// addTask function
function addTask(e) {
    if (taskInput.value === '') {
        alert("Add new task!")
    } else {
        // create li
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // add input value
        li.appendChild(document.createTextNode(taskInput.value));
        // link for element removing
        const link = document.createElement('a');
        // add css to link
        link.className = 'secondary-content';
        // add fas icon
        link.innerHTML = '<i class="fas fa-backspace"></i>';
        // add link into li
        li.appendChild(link);
        // add li into ul
        taskList.appendChild(li);
        // store task in local Storage
        storeTaskInLocalStorage(taskInput.value);
        // clear task input
        taskInput.value = '';
        e.preventDefault();
    }
}

// removeTask function
function removeTask(e) {
    // is click is over icon - over a tag
    if (e.target.parentElement.classList.contains('secondary-content')) {
        if (confirm("Do you want to remove this task?")) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

// clearTasks function
function clearTasks(e) {
    taskList.innerHTML = '';
}

// filterTasks function
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const item = task.firstChild.textContent.toLowerCase();
            if (item.indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}

// storeTaskInLocalStorage
function storeTaskInLocalStorage(task = null) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = '';
    } else {
        tasks = localStorage.getItem('tasks');
    }
    tasks = taskList.innerHTML;
    localStorage.setItem('tasks', tasks);

}

// get tasks from local storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = '';
    } else {
        tasks = localStorage.getItem('tasks');
    }
    taskList.innerHTML = tasks;
}