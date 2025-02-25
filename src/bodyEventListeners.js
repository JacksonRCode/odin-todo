import { ProjectCategories, ProjectManager, createProject } from "./project.js";
import { createTask, TaskManager } from "./task.js";
import { createNote, NoteManager } from "./note.js";

export default function createBodyListeners(user) {
  document.querySelector('.today').addEventListener('click', () => {
    clearBody();

    // Listener for displaying today's tasks  
    const tasks = user.getTasks();

    // Create date object and format to yyyy-mm-dd
    const currentDate = (new Date()).toISOString().split('T')[0];
    const today = new Date(currentDate);
    const todayTime = today.getTime();
    
    for (let i = 0; i < tasks.length; i++) {
      // Calculate # days until task is due
      let task = tasks[i];

      let dueDate = TaskManager.getDueDate(task);
      let taskDate = new Date(dueDate);
      let difference = taskDate.getTime() - todayTime;

      let days = Math.round(difference / (1000*3600*24));
    
      // Add to body if due today
      if (days === 0) {

        // Get template
        const temp = document.querySelector('#task-element');

        // Clone template
        const taskDiv = temp.content.cloneNode(true);

        // Task title 
        taskDiv.querySelector('.task-card-title').textContent = TaskManager.getTitle(task);

        // Task dueDate
        taskDiv.querySelector('.task-card-dueDate').textContent = "Due: " + dueDate;

        // Task Priority
        taskDiv.querySelector('.task-card-priority').textContent = "Priority: " + TaskManager.getPriority(task);

        // Task description
        // const taskDescription = document.createElement('p');
        // taskDescription.textContent = TaskManager.getDescription(task);
        
        // Task container

        

        document.querySelector('.main-content').appendChild(taskDiv);
      } 
    }  
  });
  document.querySelector('.week').addEventListener('click', () =>  {
    // Listener for displaying week's tasks
  });
  document.querySelector('.month').addEventListener('click', () =>   {
    // Listener for displaying month's tasks
  });
  document.querySelector('.critical').addEventListener('click', () =>  {
    // Listener for displaying critical tasks 
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