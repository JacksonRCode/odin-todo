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
  projectName.setAttribute('placeholder', 'Project Name: ')

  formBody.appendChild(projectName);

  // Project Category

  const projectCategory = document.createElement('select');
  projectCategory.classList.add('form-input-select');
  projectCategory.setAttribute('id', 'category');
  projectCategory.setAttribute('name', 'category');

  projectCategory.onchange = () => {
    projectCategory.classList.add('pop');
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
}

function instantiateNote() {
  clearForm(); 
  
  setFormHeader('New Note');  
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
