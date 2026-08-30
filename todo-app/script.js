const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-btn");
const tasksList = document.getElementById("tasks");
const taskList = document.getElementById("task-list");
const emptyIcon = document.querySelector(".icon");

const filterButtons = document.querySelectorAll(".filter-btn");
const taskCount = document.getElementById("task-count");
const clearTasks = document.getElementById("clear-tasks");
const currentDate = document.getElementById("current-date");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";


currentDate.textContent = new Date().toLocaleDateString();


addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});


function addTask() {

    const text = taskInput.value.trim();

    if (!text) {
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    taskInput.value = "";
}


function displayTasks() {
    tasksList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const text = document.createElement("span");
        text.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;

            saveTasks();
            displayTasks();
        });

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);

            saveTasks();
            displayTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteButton);

        tasksList.appendChild(li);
    });

    updateTaskCount();

    if (filteredTasks.length === 0) {
        emptyIcon.classList.remove("hidden");
    } else {
        emptyIcon.classList.add("hidden");
    }
}


function updateTaskCount() {

    const remainingTasks = tasks.filter(task => !task.completed).length;

    taskCount.textContent = remainingTasks;
}


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        displayTasks();
    });
});


clearTasks.addEventListener("click", () => {

    tasks = tasks.filter(task => !task.completed);

    saveTasks();
    displayTasks();
});


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


displayTasks();