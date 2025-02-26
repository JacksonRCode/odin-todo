import { ProjectCategories, ProjectManager, createProject } from "./project.js";
import { createTask, TaskManager } from "./task.js";
import { createNote, NoteManager } from "./note.js";

export default function createBodyListeners(user) {
  document.querySelector('.today').addEventListener('click', () => {
    clearBody();
    document.querySelector('.main-body-header').textContent = "Today's Tasks";

    // Listener for displaying today's tasks  
    const tasks = user.getTasks();

    pumpOutTasks(tasks, 0, user);
  });
  document.querySelector('.week').addEventListener('click', () =>  {
    // Listener for displaying week's tasks
    clearBody();
    document.querySelector('.main-body-header').textContent = "Weekly Tasks";

    // Listener for displaying today's tasks  
    const tasks = user.getTasks();

    pumpOutTasks(tasks, 7, user)
  });
  document.querySelector('.month').addEventListener('click', () =>   {
    // Listener for displaying month's tasks
    clearBody();
    document.querySelector('.main-body-header').textContent = "Monthly Tasks";

    // Listener for displaying today's tasks  
    const tasks = user.getTasks();

    pumpOutTasks(tasks, 30, user)
  });
  document.querySelector('.critical').addEventListener('click', () =>  {
    // Listener for displaying critical tasks 
    clearBody();
    document.querySelector('.main-body-header').textContent = "Critical Tasks";

    // Listener for displaying today's tasks  
    const tasks = user.getTasks();

    let index = 0;
    for (let i = 0; i < tasks.length; i++) {
      // Calculate # days until task is due
      let task = tasks[i];
    
      // Add to body if due today
      if (TaskManager.getPriority(task) === "High") {
        createTaskCard(task, index, user);
        index++;
      }
    }
  });
  document.querySelector('.all-projects').addEventListener('click', () =>  {
    // Listener for displaying all projects
  });
  document.querySelector('.notes-header').addEventListener('click', () => {
    // Listener for displaying all notes 
  });
}

function clearBody() {
  const content = document.querySelector('.main-content');

  while (content.children.length > 0) {
    content.removeChild(content.firstChild);
  }
}

function pumpOutTasks(tasks, max, user) {
  // Create date object and format to yyyy-mm-dd
  const currentDate = (new Date()).toISOString().split('T')[0];
  const today = new Date(currentDate);
  const todayTime = today.getTime();
  let index = 0;
  for (let i = 0; i < tasks.length; i++) {
    // Calculate # days until task is due
    let task = tasks[i];

    let dueDate = TaskManager.getDueDate(task);
    let taskDate = new Date(dueDate);
    let difference = taskDate.getTime() - todayTime;

    let days = Math.round(difference / (1000*3600*24));
  
    // Add to body if due today
    if (days <= max) {
       createTaskCard(task, index, user);
       index++;
    } 
  }  
}

function createTaskCard(task, index, user) {
  // Get template
  const temp = document.querySelector('#task-element');

  // Clone template
  const taskDiv = temp.content.cloneNode(true);

  // const value = 'instance-num-' + index;

  // taskDiv.querySelector('.task-card-container').classList.add('instance-num-' + index);
  

  // Task title 
  taskDiv.querySelector('.task-card-title').textContent = TaskManager.getTitle(task);

  // Task dueDate
  taskDiv.querySelector('.task-card-dueDate').textContent =  TaskManager.getDueDate(task);

  // Task Priority
  taskDiv.querySelector('.task-card-priority').textContent = TaskManager.getPriority(task);

  // Task description
  taskDiv.querySelector('.task-card-description').textContent = TaskManager.getDescription(task);

  // Dropdown listener
  const dd = taskDiv.querySelector('.section-two');

  taskDiv.querySelector('.dropdown').addEventListener('click', () => {
    // const target = taskDiv.querySelector('.section-two');
    if (dd.classList.contains('invisible')) { dd.classList.remove('invisible'); }
    else {dd.classList.add('invisible');}
  });

  // Checkbox listener
  const checkbox = taskDiv.querySelector('#task-complete');

  checkbox.checked = TaskManager.getComplete(task);

  checkbox.addEventListener('click', () => {
    const copy = task;
    TaskManager.markComplete(task);
    user.updateTask(copy, task);
  });
  
  document.querySelector('.main-content').appendChild(taskDiv);
}