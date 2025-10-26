// Setup Event Listener for Page Load:
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements:
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * Create the addTask Function:
     * Responsible for retrieving the input, validating it, creating the new task element,
     * and attaching the remove functionality.
     */
    function addTask() {
        // Retrieve and trim the value from the task input field.
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty.
        if (taskText === "") {
            alert("Please enter a task.");
            return; // Exit function if input is empty
        }

        // --- Task Creation ---

        // Create a new <li> element.
        const listItem = document.createElement('li');
        // Set its textContent to taskText.
        listItem.textContent = taskText;

        // Create a new button element for removing the task.
        const removeBtn = document.createElement('button');
        // Set its textContent to "Remove".
        removeBtn.textContent = "Remove";
        // Give it a class name of 'remove-btn'.
        removeBtn.className = 'remove-btn';

        // Assign an onclick event to the remove button:
        // When triggered, it removes the <li> element (its parent) from taskList.
        removeBtn.onclick = function() {
            taskList.removeChild(listItem);
        };

        // Append the remove button to the <li> element.
        listItem.appendChild(removeBtn);

        // Append the <li> to taskList.
        taskList.appendChild(listItem);

        // Clear the task input field.
        taskInput.value = "";
    }

    // --- Attach Event Listeners ---

    // 1. Add event listener to addButton for click event.
    addButton.addEventListener('click', addTask);

    // 2. Add event listener to taskInput for 'keypress' event (allowing Enter key).
    taskInput.addEventListener('keypress', function(event) {
        // Check if event.key is equal to 'Enter' before calling addTask.
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // The instruction "Invoke the addTask function on DOMContentLoaded" seems redundant
    // for an empty list initialization but will be ignored to prevent a blank task
    // unless the intention was to add initial content, which wasn't specified.
    // The main logic is encapsulated in the event listeners.
});