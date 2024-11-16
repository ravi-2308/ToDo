const apiBase = 'http://localhost:5000/api/tasks';

async function fetchTasks() {
    const response = await fetch(apiBase);
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            ${task.title}
            <div>
                <button onclick="toggleTask('${task._id}', ${!task.completed})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onclick="deleteTask('${task._id}')">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

async function addTask(event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const title = taskInput.value;
    await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
    });
    taskInput.value = '';
    fetchTasks();
}

async function toggleTask(id, completed) {
    await fetch(`${apiBase}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
    });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
    fetchTasks();
}

document.getElementById('taskForm').addEventListener('submit', addTask);
fetchTasks();
