/**
 * File name: app.js
 * @version: 1.2.2
 * @author: adnmzlz
 * Date created: 27/11/2025
 * Date last modified: 2/12/2025
 * @file: This is the JS app code for a vanilla To-Do list web application
 */
// Defining the task list as the taskList array
let taskList = [];
/**
 * @function to load the saved taskList array from localStorage when the page loads.
 */
window.onload = function () {
    if (localStorage != null) {
        // Get the string from localStorage
        const storedJsonTaskList = localStorage.getItem("storedTaskArray");
        // Convert string back into an array
        taskList = storedJsonTaskList ? JSON.parse(storedJsonTaskList) : [];
    }
    genTaskList();
};
/**
 * @function to create a new listing for each task
 */
function taskRow(tasks, index) {
    tasks.forEach(task => {
        // Create elements for the DOM
        const tbody = document.querySelector("tbody");
        const row = document.createElement("tr");
        // Making the row draggable to we can change the order around
        row.setAttribute("draggable", "true");
        // Data attribute to store task's index in the array
        row.setAttribute("data-task-index", index.toString());
        /**
         * @function for dragStart
         */
        row.addEventListener("dragstart", function (e) {
            // Store index of dragged row
            const draggedIndex = parseInt(this.getAttribute("data-task-index"));
            // Adding effectAllowed so browser can access drag and drop functionality
            e.dataTransfer.effectAllowed = "move";
            // Store it in dataTransfer object so it can be accessed in the drop
            e.dataTransfer.setData("text/plain", draggedIndex.toString());
        });
        /**
         * @function for dragOver
         */
        row.addEventListener("dragover", function (e) {
            // Required to allow drop
            e.preventDefault();
        });
        /**
         * @function for drop
         */
        row.addEventListener("drop", function (e) {
            e.preventDefault();
            // Get dragged row's index
            const draggedIndex = parseInt(e.dataTransfer?.getData("text/plain"));
            // Get target row's index
            const targetIndex = parseInt(this.getAttribute("data-task-index"));
            // Don't do anything if dropped in same spot
            if (draggedIndex === targetIndex)
                return;
            // Reorder array by removing dragged item and inserting into the new position
            const draggedTask = taskList[draggedIndex];
            // Remove
            taskList.splice(draggedIndex, 1);
            // Insert
            taskList.splice(targetIndex, 0, draggedTask);
            // Regen list and save to localStorage
            genTaskList();
        });
        const name = document.createElement("td");
        const completedCell = document.createElement("td");
        const completedButton = document.createElement("input");
        completedButton.type = "checkbox";
        /**
         * @function to change the completed property of a task by clicking the checkbox
         */
        completedButton.addEventListener("change", function () {
            task.completed = this.checked;
            // Call genTaskList() when box checked to update the status and save to localStorage.
            genTaskList();
        });
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "×";
        deleteButton.addEventListener("click", function () {
            task.hidden = true;
            // Call genTaskList() when delete clicked to reload and remove the deleted items and save updates to localStorage.
            genTaskList();
        });
        // Content into the elements
        if (task.hidden === false) {
            if (task.completed === true) {
                completedButton.checked = true;
                name.style.textDecoration = "line-through";
            }
            else {
                completedButton.checked = false;
            }
            name.textContent = `${task.name}`;
            // Add 'row' class to the row
            row.classList.add("row");
            // Add 'delete' class to deleteCellButton
            deleteButton.classList.add("delete");
            // Appending row to table
            tbody.appendChild(row);
            // Appending elements to the row
            row.appendChild(name);
            row.appendChild(completedCell);
            completedCell.appendChild(completedButton);
            row.appendChild(deleteCell);
            deleteCell.appendChild(deleteButton);
        }
    });
}
/**
 * @function to generate all entries on the taskList array
 */
function genTaskList() {
    const tbody = document.querySelector("tbody");
    tbody.replaceChildren();
    for (let i = 0; i < taskList.length; i++) {
        let task = taskList[i];
        // Passing the index as second parameter for order changes
        taskRow([task], i);
    }
    // Saving the taskList array to localStorage any time a change is made
    const jsonTaskList = JSON.stringify(taskList);
    localStorage.setItem("storedTaskArray", jsonTaskList);
}
/**
 * @function to hide the completed tasks by re-generating the list for display.
 */
function hideCompleted() {
    const tbody = document.querySelector("tbody");
    tbody.replaceChildren();
    for (let i = 0; i < taskList.length; i++) {
        let task = taskList[i];
        if (task.completed === false) {
            // Passing the index as second parameter for order changes
            taskRow([task], i);
        }
    }
}
/**
 * @function to hide the UNcompleted tasks by re-generating the list for display.
 */
function hideUncompleted() {
    const tbody = document.querySelector("tbody");
    tbody.replaceChildren();
    for (let i = 0; i < taskList.length; i++) {
        let task = taskList[i];
        if (task.completed === true) {
            // Passing the index as second parameter for order changes
            taskRow([task], i);
        }
    }
}
/**
 * ID generator @function
 */
let nextId = 0;
function genId() {
    return nextId++;
}
/**
 * @function that adds a new task to the array
 */
function addTask() {
    // Defining task input as a variable from the DOM
    let input = document.getElementById("add-input");
    // Generate the task as an object
    let newTask = {
        id: genId(),
        name: input.value,
        completed: false,
        hidden: false
    };
    // Adds the task object to the tasks array
    taskList.push(newTask);
    // Regenerates the task list
    genTaskList();
    // Resets the input field
    input.value = '';
}
/**
 * @function to add support for enter key to add a new task instead of just clickin the add button
 */
function checkEnter(event) {
    if (event.key === "Enter") {
        addTask();
    }
}
window.addTask = addTask;
window.taskList = taskList;
window.taskRow = taskRow;
window.hideCompleted = hideCompleted;
window.hideUncompleted = hideUncompleted;
window.genTaskList = genTaskList;
window.checkEnter = checkEnter;
export {};
//# sourceMappingURL=app.js.map