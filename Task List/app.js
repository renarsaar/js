// Define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners

loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);

  // Remove task event TO ul
  taskList.addEventListener("click", removeTask);

  // Clear task event
  clearBtn.addEventListener("click", clearTasks);

  // Filter tasks
  filter.addEventListener("keyup", filterTasks);
}

// Get Task from Local Storage
function getTasks() {
  let tasks;
  // Check if any tasks in LocalStorage
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // If there is = set it whatever is in there
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  // Loop through these tasks that exists
  tasks.forEach(function(task) {
    // LI ELEMENT
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node & append to li
    li.appendChild(document.createTextNode(task));

    // A ELEMENT
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon inside <a>...</a>
    link.innerHTML = "<i class='fa fa-remove'></i>";
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask() {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  // LI ELEMENT
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node & append to li (input field="text" id="task")
  li.appendChild(document.createTextNode(taskInput.value));

  // A ELEMENT
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon inside <a>...</a>
  link.innerHTML = "<i class='fa fa-remove'></i>";
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store to local storage before clearing
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = "";
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // Local storage can only contain strings
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  // Adding on to array
  tasks.push(task);

  // Store
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  // Check local storage, pun in variable
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  // Loop through
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(e) {
  // Slower
  // taskList.innerHTML = "";

  // Faster
  // While something in the list
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear tasks
  clearTasksFromLocalStorage();
}

// Clear tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter tasks with foreach loop
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  // queryselector all returns a node list = array
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    // IndexOf(text) = content
    if (item.toLowerCase().indexOf(text) != -1) {
      // Then show content as block
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
