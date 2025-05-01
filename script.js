// 获取DOM元素
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// 从本地存储加载任务
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 渲染任务列表
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}
                onclick="toggleTask(${index})">
            <span class="task-text">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">删除</button>
        `;
        
        taskList.appendChild(li);
    });
    
    // 保存到本地存储
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 添加新任务
function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({
            text: text,
            completed: false
        });
        taskInput.value = '';
        renderTasks();
    }
}

// 删除任务
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// 切换任务完成状态
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// 事件监听
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// 初始化渲染
renderTasks();