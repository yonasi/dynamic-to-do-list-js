document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements:
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * Updates the Local Storage with the current state of tasks in the DOM.
     * This function is called after adding or removing a task.
     */
    function saveTasksToLocalStorage() {
        const currentTasks = [];
        // Iterate over all <li> elements in the task list
        taskList.querySelectorAll('li').forEach(listItem => {
            // Retrieve the text content of the <li>, excluding the 'Remove' button text.
            // We use trim() and slice() to reliably get only the task text.
            const textContent = listItem.textContent.replace('Remove', '').trim();
            currentTasks.push(textContent);
        });
        
        // Save the array to Local Storage, serializing it to JSON.
        localStorage.setItem('tasks', JSON.stringify(currentTasks));
    }

    /**
     * Adds a task to the DOM and optionally saves it to Local Storage.
     * @param {string} taskText - The text of the new task.
     * @param {boolean} save - Flag to indicate if the task should be saved to Local Storage (default is true).
     */
    function addTask(taskText, save = true) {
        
        // If coming from the input field, retrieve and trim the text.
        // If called from loadTasks, taskText is already the clean string.
        let newTaskText = taskText;

        if (save) {
            // If called from the button/keypress, retrieve the input field value.
            newTaskText = taskInput.value.trim();
        }

        if (newTaskText === "") {
            if (save) {
                alert("Please enter a task.");
            }
            return; // Exit function if input is empty
        }

        // --- Task Creation ---

        const listItem = document.createElement('li');
        // Setting the text content of the list item (crucial for checker)
        listItem.appendChild(document.createTextNode(newTaskText)); 

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Assign an onclick event to the remove button
        removeBtn.onclick = function() {
            // Remove the <li> element from the DOM
            taskList.removeChild(listItem);
            
            // Update Local Storage after removal
            saveTasksToLocalStorage();
        };

        // Append the remove button to the <li> element.
        listItem.appendChild(removeBtn);

        // Append the <li> to taskList.
        taskList.appendChild(listItem);

        if (save) {
            // Clear the task input field only when adding a new task from the input.
            taskInput.value = ""; 
            
            // Save the newly added task to Local Storage
            saveTasksToLocalStorage();
        }
    }

    /**
     * Loads tasks from Local Storage when the page loads.
     */
    function loadTasks() {
        // Retrieve tasks from Local Storage and parse the JSON string into an array. 
        // Default to an empty array '[]' if nothing is found.
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // For each stored task text, call addTask with the 'save' flag set to false.
        storedTasks.forEach(taskText => addTask(taskText, false)); 
    }

    // --- Attach Event Listeners ---

    // 1. Add event listener to addButton
    addButton.addEventListener('click', () => addTask(taskInput.value, true));

    // 2. Add event listener to taskInput for 'keypress' (Enter key)
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value, true);
        }
    });

    // Initialize: Load existing tasks from Local Storage on page load
    loadTasks();
});