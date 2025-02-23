export { createProject, ProjectManager, ProjectCategories };


function createProject(title, category) {
  let _title = title;
  let _tasks = [];
  let _category = category;

  const removeTask = (task) => {
    let found = 0;
    for (let i = 0; i < _tasks.length; i++) {
      if (_tasks[i] === task) {
        found = 1;
      };
      
      _tasks[i] = _tasks[i+found];
    }

    if (found) { _tasks.pop() };
  }

  return {
    getTitle: () => _title,
    getTasks: () => _tasks,
    getCategory: () => _category,

    setTitle: ( newTitle ) => { _title = newTitle },

    addTask: (task) => {
      _tasks.push(task);
    },

    removeTask,

    setCategory: ( newCategory ) => { _category = newCategory },
  }
}

const ProjectManager = {
  /*
    Centralized manager of projects
  */

  changeTitle(project, value) {
    project.setTitle(value);
  },

  getTitle(project) {
    return project.getTitle();
  },

  addTask(project, task) {
    project.addTask(task);
  },

  removeTask(project, task) {
    project.removeTask(task);
  },

  getTasks(project) {
    return project.getTasks();
  },

  getCategory(project) {
    return project.getCategory();
  },

  setCategory(project, newCategory) {
    project.setCategory(newCategory);
  },

}

let ProjectCategories = ['Health', 'Work', 'Social'];

// const apple = createProject('apple');

// ProjectManager.changeTitle(apple, "Virginia");

// console.log(ProjectManager.getTitle(apple));

// ProjectManager.addTask(apple, "Hey");

// console.log(ProjectManager.getTasks(apple));

// ProjectManager.removeTask(apple, "Hey");

// console.log(ProjectManager.getTasks(apple));