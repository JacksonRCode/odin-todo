import { ProjectCategories, ProjectManager, createProject } from "./project.js";
import { createTask, TaskManager } from "./task.js";
import { createNote, NoteManager } from "./note.js";
export { displayProjectTasks};

export default function createBodyListeners(user) {
  document.querySelector('.today').addEventListener('click', () => {
    clearBody();
    document.querySelector('.main-body-header').textContent = "Today's Tasks";

    setCurrent(document.querySelector('.today'));

    // Listener for displaying today's tasks  
    const tasks = user.getTasks();

    pumpOutTasks(tasks, 0, user);
  });
  document.querySelector('.week').addEventListener('click', () =>  {
    // Listener for displaying week's tasks
    clearBody();
    document.querySelector('.main-body-header').textContent = "Weekly Tasks";

    setCurrent(document.querySelector('.week'));

    // Listener for displaying today's tasks  
    const tasks = user.getTasks();

    pumpOutTasks(tasks, 7, user)
  });
  document.querySelector('.month').addEventListener('click', () =>   {
    // Listener for displaying month's tasks
    clearBody();
    document.querySelector('.main-body-header').textContent = "Monthly Tasks";

    setCurrent(document.querySelector('.month'));

    // Listener for displaying today's tasks  
    const tasks = user.getTasks();

    pumpOutTasks(tasks, 30, user)
  });
  document.querySelector('.critical').addEventListener('click', () =>  {
    // Listener for displaying critical tasks 
    clearBody();
    document.querySelector('.main-body-header').textContent = "Critical Tasks";

    setCurrent(document.querySelector('.critical'));

    // Listener for displaying today's tasks  
    const tasks = user.getTasks();

    let index = 0;
    for (let i = 0; i < tasks.length; i++) {
      // Calculate # days until task is due
      let task = tasks[i];
    
      // Add to body if due today
      if (TaskManager.getPriority(task) === "High") {
        createTaskCard(task, user);
        index++;
      }
    }
  });

  document.querySelector('.tasks-header').addEventListener('click', () => {
    // Display all tasks
    clearBody();
    setCurrent(document.querySelector('.tasks-header'));

    document.querySelector('.main-body-header').textContent = "All Tasks";
    
    const tasks = user.getTasks();

    for (let i = 0; i < tasks.length; i++) {

      createTaskCard(tasks[i], user);
    }


  })
  document.querySelector('.notes-header').addEventListener('click', () => {
    // Listener for displaying all notes 
    clearBody();
    setCurrent(document.querySelector('.notes-header'));

    document.querySelector('.main-body-header').textContent = "Notes";

    displayNotes(user);
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
       createTaskCard(task, user);
       index++;
    } 
  }  
}

function displayProjectTasks(proj, user) {
  clearBody();
  const title = TaskManager.getTitle(proj);

  document.querySelector('.main-body-header').textContent = title;

  const tasks = ProjectManager.getTasks(proj);

  let l = tasks.length;

  if (l === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.classList.add('emptyProject');
    emptyMessage.textContent = "This project has no current tasks."
    document.querySelector('.main-content').appendChild(emptyMessage);

    const emptyMessage2 = document.createElement('p');
    emptyMessage2.classList.add('emptyProject');
    emptyMessage2.textContent = "To add a task, create a new one while this page is open."
    document.querySelector('.main-content').appendChild(emptyMessage2);
  }

  for (let i = 0; i < l; i++) {
    createTaskCard(tasks[i], user);
  }
} 

function createTaskCard(task, user) {
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

function displayNotes(user) {
  const notes = user.getNotes();

  for (let i = 0; i < notes.length; i++) {
    const title = NoteManager.getTitle(notes[i]);
    const description = NoteManager.getContent(notes[i]);

    // Get note template
    const temp = document.querySelector('#note-element');

    // Clone template
    const noteDiv = temp.content.cloneNode(true);

    noteDiv.querySelector('.note-card-title').textContent = title;
    noteDiv.querySelector('.note-card-description').textContent = description;
    noteDiv.querySelector('.delete-note').addEventListener('click', () => {
      user.removeNote(notes[i]);
      document.querySelector('.notes-header').click();
    });
    
    document.querySelector('.main-content').appendChild(noteDiv);
  }


}

function setCurrent(thisOne) {
  const btns = document.querySelectorAll('.sidebar-button');

  for (let i = 0; i < btns.length; i++) {
    let curr = btns[i];
    curr.classList.remove('sidebar-current');
  }
  
  thisOne.classList.add('sidebar-current');
}