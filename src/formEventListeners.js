import { ProjectCategories, createProject } from "./project.js";
import { createTask } from "./task.js";
import { createNote } from "./note.js";
import { displayProjectTasks } from "./bodyEventListeners.js";


export default function createFormListeners(user) {
  
  document.querySelector('.create-new-thing').addEventListener('click', () => {
    /* 
      Event listener for [+] button to open form and create new thing
    */
    const container = document.querySelector('.container');
    container.classList.add('blurry');
    const header = document.querySelector('.header');
    header.classList.add('blurry');

    const divForm = document.querySelector('.newThingForm');
    divForm.classList.remove('invisible'); 

  });

  document.querySelector('.exit-form').addEventListener('click', () => {
    /*
      Event listener for exit icon on the form to exit the form
    */
    closeForm();
  });

  document.querySelector('.type-project').addEventListener('click', () => {
    instantiateProject();
  });

  document.querySelector('.type-task').addEventListener('click', () => {
    instantiateTask();
  });

  document.querySelector('.type-note').addEventListener('click', () => {
    instantiateNote();
  });

  document.querySelector('.type-create').addEventListener('click', () => {
    const type = document.querySelector('.form-title').textContent;
    let change = false;

    if (type === 'New Project') {
      const title = document.querySelector('#project-title').value;
      // const categorySelection = document.querySelector('#category');
      // const newCategory = document.querySelector('#new-project-category');

      // let category = newCategory.value;

      // if (category === "") {
      //   category = categorySelection.options[categorySelection.selectedIndex].value;
      // } 
      
      // Create project
      const proj = createProject(title, null);

      // Add project to user
      user.addProject(proj);

      const newProject = document.createElement('button');
      newProject.classList.add('sidebar-button');
      newProject.classList.add('project-category');
      newProject.textContent = title;

      // Add event listener for newProject
      newProject.addEventListener('click', () => {
        // Display all current tasks
        
        // Get all sidebar buttons and remove current class from current
        const btns = document.querySelectorAll('.sidebar-button');

        for (let i = 0; i < btns.length; i++) {
          let curr = btns[i];
          curr.classList.remove('sidebar-current');
        }

        newProject.classList.add('sidebar-current');

        displayProjectTasks(proj, user);
      });

      document.querySelector('.project-categories').appendChild(newProject);


      change = true;

    } else if (type === 'New Task') {
      const title = document.querySelector('#task-title').value;
      const description = document.querySelector('#task-description').value;
      const dueDate = document.querySelector('#task-date').value;
      const priority = document.querySelector('.pop-bg').textContent;

      // Create task
      const task = createTask(title, description, dueDate, priority, false);

      // Add task to user
      user.addTask(task);

      // console.log(user.getTasks()[0].getPriority());

      change = true;

    } else if (type === 'New Note') {
      const title = document.querySelector('#note-title').value;
      console.log("Title: " + title);
      const description = document.querySelector('#note-description').value;
      console.log("Description: " + description);

      // Create note
      const note = createNote(title, description);

      // Add note to user
      user.addNote(note);

      change = true;
    }

    if (change) {
      closeForm();
      // Simulate clicking and re-loading content
      const headerContent = document.querySelector('.main-body-header').textContent;

      if (headerContent === "Today's Tasks") {
        document.querySelector('.today').click();
      } 
      else if (headerContent === "Weekly Tasks") {
        document.querySelector('.week').click();
      } 
      else if (headerContent === "Monthly Tasks") {
        document.querySelector('.month').click();
      } 
      else if (headerContent === "Critical Tasks") {  
        document.querySelector('.critical').click();
      }
    }
    
  });
};

function instantiateProject() {
  clearForm();

  setFormHeader('New Project');  
 
  const formBody = document.querySelector('.form-input-body');

  // Project Name

  const projectName = document.createElement('input');
  projectName.setAttribute("type", "text");
  projectName.setAttribute("required", "true");
  projectName.setAttribute("id", "project-title");
  projectName.classList.add('form-input-text');
  projectName.setAttribute('placeholder', 'Project Title: ')

  formBody.appendChild(projectName);

  // // Project Category

  // const projectCategory = document.createElement('select');
  // projectCategory.classList.add('form-input-select');
  // projectCategory.setAttribute('id', 'category');
  // projectCategory.setAttribute('name', 'category');

  // projectCategory.onchange = () => {
  //   projectCategory.classList.add('colourME');
  // };

  // for (let i = -1; i < ProjectCategories.length; i++) {
  //   let op = document.createElement('option');
  //   if (i === -1) {
  //     op.setAttribute('disabled', 'true');
  //     op.setAttribute('selected', 'true');
  //     op.setAttribute('value', 'none');
  //     op.textContent = "Select project category";
  //   } else {
  //     op.setAttribute('value', ProjectCategories[i]);
  //     op.textContent = ProjectCategories[i];
  //   }
  //   projectCategory.appendChild(op);
  // }

  // const newCategory = document.createElement('input');
  // newCategory.setAttribute("type", "text");
  // newCategory.setAttribute("id", "new-project-category");
  // newCategory.classList.add('form-input-text');
  // newCategory.setAttribute('placeholder', 'Or, create new category: ');

  // formBody.appendChild(projectCategory);
  // formBody.appendChild(newCategory);
}

function instantiateTask() {
  clearForm();
  setFormHeader('New Task');  

  const formBody = document.querySelector('.form-input-body');

  // Title

  const taskName = document.createElement('input');
  taskName.setAttribute("type", "text");
  taskName.setAttribute('id', 'task-title');
  taskName.classList.add('form-input-text');
  taskName.setAttribute('placeholder', 'Task Title: ')

  formBody.appendChild(taskName);

  // Description textarea

  const taskDescription = document.createElement('textarea');
  taskDescription.classList.add('taskDescription');
  taskDescription.setAttribute('id', 'task-description');
  taskDescription.setAttribute('placeholder', 'Task Description: Max 300 characters');
  taskDescription.setAttribute('maxlength', '300');

  formBody.appendChild(taskDescription);

  // Due date
  const divDateContainer = document.createElement('div');
  divDateContainer.classList.add('div-date-container');

  const dateLabel = document.createElement('label');
  dateLabel.textContent = "Due Date:";

  const dateInput = document.createElement('input');
  dateInput.setAttribute('type', 'date');
  dateInput.setAttribute('id', 'task-date');
  dateInput.classList.add('form-input-date');

  divDateContainer.appendChild(dateLabel);
  divDateContainer.appendChild(dateInput);


  formBody.appendChild(divDateContainer);

  // Priority

  const divPriorityContainer = document.createElement('div');
  divPriorityContainer.classList.add('div-priority-container');

  const priorityLabel = document.createElement('label');
  priorityLabel.textContent = "Priority:";

  const priorityBtnDiv = document.createElement('div');
  priorityBtnDiv.classList.add('priority-btn-container');

  const lowBtn = document.createElement('button');
  lowBtn.textContent = "Low";
  const mediumBtn = document.createElement('button');
  mediumBtn.textContent = "Medium";
  const highBtn = document.createElement('button');
  highBtn.textContent = "High";

  lowBtn.addEventListener('click', (e) => { stickyButton(e)});
  mediumBtn.addEventListener('click', (e) => { stickyButton(e)});
  highBtn.addEventListener('click', (e) => { stickyButton(e)});

  lowBtn.classList.add('low-priority');
  mediumBtn.classList.add('medium-priority');
  highBtn.classList.add('high-priority');

  priorityBtnDiv.appendChild(lowBtn);
  priorityBtnDiv.appendChild(mediumBtn);
  priorityBtnDiv.appendChild(highBtn);

  divPriorityContainer.appendChild(priorityLabel);
  divPriorityContainer.appendChild(priorityBtnDiv);


  formBody.appendChild(divPriorityContainer);

  
}

function instantiateNote() {
  clearForm(); 
  setFormHeader('New Note');  

  const formBody = document.querySelector('.form-input-body');

  // Title

  const noteName = document.createElement('input');
  noteName.setAttribute("type", "text");
  noteName.setAttribute('id', 'note-title');
  noteName.classList.add('form-input-text');
  noteName.setAttribute('placeholder', 'Note Title: ')

  formBody.appendChild(noteName);

  // Description textarea

  const noteDescription = document.createElement('textarea');
  noteDescription.classList.add('noteDescription');
  noteDescription.setAttribute('id', 'note-description');
  noteDescription.setAttribute('placeholder', 'Note Description: Max 1000 characters');
  noteDescription.setAttribute('maxlength', '1000');

  formBody.appendChild(noteDescription)
}

function setFormHeader(value) {
  document.querySelector('.form-title').textContent = value;
}

function clearForm() {
  const form = document.querySelector('.form-input-body');

  while (form.children.length > 0) {
    form.removeChild(form.firstChild);
  }
}

function closeForm() {
  const container = document.querySelector('.container');
  container.classList.remove('blurry');
  const header = document.querySelector('.header');
  header.classList.remove('blurry');

  const divForm = document.querySelector('.newThingForm');
  divForm.classList.add('invisible');

  setFormHeader('New...');  
  clearForm();
}

function stickyButton(e) {
  /* 
    Make priority button selection stick when creating a new task.

    'pop-bg' will also be used to tell which priority has been chosen for the task.
  */
  const cont = document.querySelector('.priority-btn-container');

  for ( let i = 0; i < cont.children.length; i++ ) {
    cont.children[i].classList.remove('pop-bg');
  }
  
  e.target.classList.add('pop-bg');
  // console.log(e.target);
}


