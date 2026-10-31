const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const itemsLeft = document.getElementById("items-left");
const clearCompletedButton = document.getElementById("clear-completed-button");
const clearAllButton = document.getElementById("clear-all-button");
const filterButtons = document.querySelectorAll(".filter-button");

let tasks = [];
let currentFilter = "all";
let nextTaskId = 1;

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    taskInput.focus();
    return;
  }
  tasks.push({ id: nextTaskId, text: text, completed: false });
  nextTaskId++;
  taskInput.value = "";
  taskInput.focus();
  render();
}

function toggleTask(taskId) {
  const task = tasks.find(function (item) {
    return item.id === taskId;
  });
  if (task) {
    task.completed = !task.completed;
  }
  render();
}

function deleteTask(taskId) {
  tasks = tasks.filter(function (item) {
    return item.id !== taskId;
  });
  render();
}

function clearCompleted() {
  tasks = tasks.filter(function (item) {
    return !item.completed;
  });
  render();
}

function clearAll() {
  tasks = [];
  render();
}

function setFilter(filterName) {
  currentFilter = filterName;
  render();
}

function getVisibleTasks() {
  if (currentFilter === "active") {
    return tasks.filter(function (item) {
      return !item.completed;
    });
  }
  if (currentFilter === "completed") {
    return tasks.filter(function (item) {
      return item.completed;
    });
  }
  return tasks;
}

function getEmptyText() {
  if (currentFilter === "active") {
    return "No active tasks";
  }
  if (currentFilter === "completed") {
    return "No completed tasks";
  }
  return "No tasks yet. Add one above.";
}

function createTaskElement(task) {
  const listItem = document.createElement("li");
  listItem.className = "task-item";
  if (task.completed) {
    listItem.classList.add("completed");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", "Mark task as completed");
  checkbox.addEventListener("change", function () {
    toggleTask(task.id);
  });

  const textSpan = document.createElement("span");
  textSpan.className = "task-text";
  textSpan.textContent = task.text;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "\u00D7";
  deleteButton.setAttribute("aria-label", "Delete task");
  deleteButton.addEventListener("click", function () {
    deleteTask(task.id);
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(textSpan);
  listItem.appendChild(deleteButton);
  return listItem;
}

function updateCounter() {
  const activeCount = tasks.filter(function (item) {
    return !item.completed;
  }).length;
  itemsLeft.textContent = activeCount === 1 ? "1 item left" : activeCount + " items left";
}

function updateFilterButtons() {
  filterButtons.forEach(function (button) {
    button.classList.toggle("active", button.dataset.filter === currentFilter);
  });
}

function render() {
  const visibleTasks = getVisibleTasks();
  taskList.textContent = "";
  visibleTasks.forEach(function (task) {
    taskList.appendChild(createTaskElement(task));
  });
  emptyMessage.textContent = getEmptyText();
  emptyMessage.hidden = visibleTasks.length > 0;
  updateCounter();
  updateFilterButtons();
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    setFilter(button.dataset.filter);
  });
});

clearCompletedButton.addEventListener("click", clearCompleted);
clearAllButton.addEventListener("click", clearAll);

render();
