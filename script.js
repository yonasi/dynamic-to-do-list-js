// Setup Event Listener for Page Load:
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements:
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * Create the addTask Function:
     * Handles input retrieval, validation, task element creation, and attaching the remove logic.
     */
    function addTask() {
        // Retrieve and trim the value from the task input field.
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty.
        if (taskText === "") {
            alert("Please enter a task.");
            return; // Exit function if input is empty
        }

        // --- Task Creation and Removal Logic (Modified as requested) ---

        // 1. Create a new <li> element.
        const listItem = document.createElement('li');
        // Set its textContent to taskText.
        listItem.textContent = taskText;

        // 2. Create a new button element for removing the task.
        const removeBtn = document.createElement('button');
        // Set its textContent to "Remove".
        removeBtn.textContent = "Remove";
        // Give it a class name of 'remove-btn'.
        removeBtn.className = 'remove-btn';

        // 3. Assign an onclick event to the remove button:
        // When triggered, it removes the listItem element (its parent) from taskList.
        removeBtn.onclick = function() {
            taskList.removeChild(listItem);
        };

        // 4. Append the remove button to the <li> element.
        listItem.appendChild(removeBtn);

        // 5. Append the <li> to taskList.
        taskList.appendChild(listItem);

        // 6. Clear the task input field.
        taskInput.value = "";
    }

    // --- Attach Event Listeners (Modified as requested) ---

    // 1. Add an event listener to addButton that calls addTask when the button is clicked.
    addButton.addEventListener('click', addTask);

    // 2. Add an event listener to taskInput for the 'keypress' event.
    taskInput.addEventListener('keypress', function(event) {
        // Check if event.key is equal to 'Enter' before calling addTask.
        if (event.key === 'Enter') {
            addTask();
        }
    });
});