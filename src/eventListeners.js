import { ProjectCategories } from "./project";


export default function createListeners() {
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
    const container = document.querySelector('.container');
    container.classList.remove('blurry');
    const header = document.querySelector('.header');
    header.classList.remove('blurry');

    const divForm = document.querySelector('.newThingForm');
    divForm.classList.add('invisible');

    setFormHeader('New...');  
    clearForm();
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
};

function instantiateProject() {
  clearForm();

  setFormHeader('New Project');  
 
  const formBody = document.querySelector('.form-input-body');

  // Project Name

  const projectName = document.createElement('input');
  projectName.setAttribute("type", "text");
  projectName.classList.add('form-input-text');
  projectName.setAttribute('placeholder', 'Project Title: ')

  formBody.appendChild(projectName);

  // Project Category

  const projectCategory = document.createElement('select');
  projectCategory.classList.add('form-input-select');
  projectCategory.setAttribute('id', 'category');
  projectCategory.setAttribute('name', 'category');

  projectCategory.onchange = () => {
    projectCategory.classList.add('colourME');
  };

  for (let i = -1; i < ProjectCategories.length; i++) {
    let op = document.createElement('option');
    if (i === -1) {
      op.setAttribute('disabled', 'true');
      op.setAttribute('selected', 'true');
      op.setAttribute('value', 'none');
      op.textContent = "Select project category";
    } else {
      op.setAttribute('value', ProjectCategories[i]);
      op.textContent = ProjectCategories[i];
    }
    projectCategory.appendChild(op);
  }

  const newCategory = document.createElement('input');
  newCategory.setAttribute("type", "text");
  newCategory.classList.add('form-input-text');
  newCategory.setAttribute('placeholder', 'Or, create new category: ');

  formBody.appendChild(projectCategory);
  formBody.appendChild(newCategory);
}

function instantiateTask() {
  clearForm();
  setFormHeader('New Task');  

  const formBody = document.querySelector('.form-input-body');

  // Title

  const taskName = document.createElement('input');
  taskName.setAttribute("type", "text");
  taskName.classList.add('form-input-text');
  taskName.setAttribute('placeholder', 'Task Title: ')

  formBody.appendChild(taskName);

  // Description textarea

  const taskDescription = document.createElement('textarea');
  taskDescription.classList.add('taskDescription');
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
  noteName.classList.add('form-input-text');
  noteName.setAttribute('placeholder', 'Note Title: ')

  formBody.appendChild(noteName);

  // Description textarea

  const noteDescription = document.createElement('textarea');
  noteDescription.classList.add('noteDescription');
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
  console.log(e.target);
}
