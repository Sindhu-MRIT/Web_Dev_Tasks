const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const undoBtn = document.getElementById('undoBtn');
const resetBtn = document.getElementById('resetBtn');
const taskList = document.getElementById('taskList');

let undoStack = []; //to store value so that later retrieved through undoing

// For Enabling tsk creation
function createTaskItem(taskText, isCompleted = false)
{
  const li = document.createElement('li');
  li.textContent = taskText;
  if (isCompleted) li.classList.add('completed');

  //Toggle on click
  li.addEventListener('click', () => { li.classList.toggle('completed');});

  //Remove button
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Exclude';
  removeBtn.className = 'remove-btn';

  //remiving and addidng to stack to retieve while undoing
  removeBtn.addEventListener('click', (e) =>
    {
    e.stopPropagation();
    undoStack.push({
      text: taskText,
      completed: li.classList.contains('completed')
    });
    li.remove();
  });

  li.appendChild(removeBtn);
  return li;
}

// Adding the button task
addBtn.addEventListener('click', () => {
  const taskText = input.value.trim();
  if (!taskText) {
    alert('Empty task not accepted!'); // alert message
    return;
  }

  const li = createTaskItem(taskText);
  taskList.appendChild(li);
  input.value = '';
});

// Undo button which will restore data
undoBtn.addEventListener('click', () =>{
  if (undoStack.length > 0) {
    const lastTask = undoStack.pop();
    const li = createTaskItem(lastTask.text, lastTask.completed);
    taskList.appendChild(li);
  } else
  {
    alert('🧙‍♂️ Nothing to undo!');
  }
});

// Resetting button to clear list given
resetBtn.addEventListener('click', () => {
  if (confirm("Are you sure you want to clear all tasks? 🧹"))
    {
    taskList.innerHTML = '';
    undoStack = []; // Clear undo history too
  }
});