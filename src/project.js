
function createProject(title) {
  let _title = title;
  let _tasks = [];

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

    setTitle: ( newTitle ) => { _title = newTitle },

    addTask: (task) => {
      _tasks.push(task);
    },

    removeTask,
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
  }
}

// const apple = createProject('apple');

// ProjectManager.changeTitle(apple, "Virginia");

// console.log(ProjectManager.getTitle(apple));

// ProjectManager.addTask(apple, "Hey");

// console.log(ProjectManager.getTasks(apple));

// ProjectManager.removeTask(apple, "Hey");

// console.log(ProjectManager.getTasks(apple));