/**
 * File name: deleted.js
 * @version: 1.2.2
 * @author: adnmzlz
 * Date created: 30/11/2025
 * Date last modified: 2/12/2025
 * @file: This is the script for the restore deleted tasks page.
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
    closeDialog();
};
/**
 * @function to create a new listing for each task
 */
function taskRow(tasks) {
    tasks.forEach(task => {
        // Create elements for the DOM
        const tbody = document.querySelector("tbody");
        const row = document.createElement("tr");
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
        const restoreCell = document.createElement("td");
        const restoreButton = document.createElement("button");
        restoreButton.textContent = "✔";
        restoreButton.addEventListener("click", function () {
            task.hidden = false;
            // Call genTaskList() when restore clicked to reload and remove the restored items and save updates to localStorage.
            genTaskList();
        });
        // Content into the elements
        if (task.hidden === true) {
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
            restoreButton.classList.add("restore");
            // Appending row to table
            tbody.appendChild(row);
            // Appending elements to the row
            row.appendChild(name);
            row.appendChild(completedCell);
            completedCell.appendChild(completedButton);
            row.appendChild(restoreCell);
            restoreCell.appendChild(restoreButton);
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
        taskRow([task]);
    }
    // Saving the taskList array to localStorage any time a change is made
    const jsonTaskList = JSON.stringify(taskList);
    localStorage.setItem("storedTaskArray", jsonTaskList);
}
/**
 * @function to open delete purge dialog box
 */
function purgeDeletes() {
    const dialogBoxOne = document.getElementById("confirm1");
    dialogBoxOne.style.visibility = "visible";
    dialogBoxOne.showModal();
}
/**
 * @function to open confirmation dialog box
 */
function openSecondConfirm() {
    const dialogBoxOne = document.getElementById("confirm1");
    const dialogBoxTwo = document.getElementById("confirm2");
    dialogBoxOne.close();
    dialogBoxOne.style.visibility = "hidden";
    dialogBoxTwo.style.visibility = "visible";
    dialogBoxTwo.showModal;
}
/**
 * @function to complete the purge of all deleted tasks
 */
function completePurge() {
    for (let i = taskList.length - 1; i >= 0; i--) {
        let task = taskList[i];
        if (task.hidden === true) {
            taskList.splice(i, 1);
        }
    }
    genTaskList();
    closeDialog();
}
/**
 * @function to cancel/close both dialog boxes
 */
function closeDialog() {
    const dialogBoxOne = document.getElementById("confirm1");
    const dialogBoxTwo = document.getElementById("confirm2");
    dialogBoxOne.close();
    dialogBoxOne.style.visibility = "hidden";
    dialogBoxTwo.close();
    dialogBoxTwo.style.visibility = "hidden";
}
window.taskList = taskList;
window.taskRow = taskRow;
window.purgeDeletes = purgeDeletes;
window.openSecondConfirm = openSecondConfirm;
window.completePurge = completePurge;
window.closeDialog = closeDialog;
export {};
//# sourceMappingURL=deleted.js.map