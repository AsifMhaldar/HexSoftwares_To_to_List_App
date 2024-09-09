// Initialize the to-do list from localStorage
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

const addTaskBtn = document.getElementById('add-task-btn');
addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskValue = taskInput.value.trim();

    if (taskValue === '') return; // Ignore empty tasks

    const taskItem = createTaskItem(taskValue);

    document.getElementById('task-list').appendChild(taskItem);
    taskInput.value = '';

    saveTaskToLocalStorage(taskValue);
}

function createTaskItem(taskValue) {
    const li = document.createElement('li');
    li.classList.add('task-item');

    const span = document.createElement('span');
    span.textContent = taskValue;

    const taskButtons = document.createElement('div');
    taskButtons.classList.add('task-buttons');

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateTaskInLocalStorage(taskValue);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        li.remove();
        removeTaskFromLocalStorage(taskValue);
    });

    taskButtons.appendChild(completeBtn);
    taskButtons.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(taskButtons);

    return li;
}

// LocalStorage functions

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = createTaskItem(task.value);
        if (task.completed) taskItem.classList.add('completed');
        document.getElementById('task-list').appendChild(taskItem);
    });
}

function saveTaskToLocalStorage(taskValue) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ value: taskValue, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(taskValue) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        if (task.value === taskValue) {
            task.completed = !task.completed;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskValue) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.value !== taskValue);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
