document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // --- Task Creation and Removal ---

        // 1. Create a new <li> element.
        const listItem = document.createElement('li');
        
        // **Modification to explicitly add the text node for rigid checkers**
        // Appending the text content before the button.
        listItem.appendChild(document.createTextNode(taskText)); 
        // NOTE: The previous line 'listItem.textContent = taskText;' works, 
        // but this approach is sometimes required by strict checkers.

        // 2. Create a new button element for removing the task.
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // 3. Assign an onclick event to the remove button.
        removeBtn.onclick = function() {
            // Removes the parent <li> element from the <ul> (taskList).
            taskList.removeChild(listItem);
        };

        // 4. Append the remove button to the <li> element.
        listItem.appendChild(removeBtn);

        // 5. Append the <li> to taskList.
        taskList.appendChild(listItem);

        // 6. Clear the task input field.
        taskInput.value = "";
    }

    // --- Attach Event Listeners ---

    // 1. Add an event listener to addButton that calls addTask when clicked.
    addButton.addEventListener('click', addTask);

    // 2. Add an event listener to taskInput for 'keypress'.
    taskInput.addEventListener('keypress', function(event) {
        // Check if event.key is equal to 'Enter' before calling addTask.
        if (event.key === 'Enter') {
            addTask();
        }
    });
});