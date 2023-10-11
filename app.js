document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage on page load
    loadTasks();

    // Add task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // Edit task
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-task')) {
            const taskElement = e.target.parentElement;
            const taskTextElement = taskElement.querySelector('.task-text');
            const oldTaskText = taskTextElement.textContent.trim();
            const newTaskText = prompt('Edit task:', oldTaskText);
            if (newTaskText !== null && newTaskText !== '') {
                editTask(taskTextElement, oldTaskText, newTaskText);
            }
        }
    });

    // Delete task
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-task')) {
            deleteTask(e.target.parentElement);
        }
    });

    // Load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => {
            addTask(task);
        });
    }

    // Add task
    function addTask(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <button class="edit-task">Edit</button>
            <button class="delete-task">Delete</button>
        `;
        taskList.appendChild(li);

        // Save task to local storage
        saveTask(taskText);
    }

    // Save task to local storage
    function saveTask(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Edit task
    function editTask(taskTextElement, oldTaskText, newTaskText) {
        taskTextElement.textContent = newTaskText;

        // Update task in local storage
        updateTask(oldTaskText, newTaskText);
    }

    // Update task in local storage
    function updateTask(oldTaskText, newTaskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.map((task) => (task === oldTaskText ? newTaskText : task));
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Delete task
    function deleteTask(taskElement) {
        const taskText = taskElement.querySelector('.task-text').textContent.trim();
        taskElement.remove();

        // Remove task from local storage
        removeTask(taskText);
    }

    // Remove task from local storage
    function removeTask(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter((task) => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
});
