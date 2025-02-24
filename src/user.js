
function User(name, projects, tasks, notes) {
  let _name = name;
  let _projects = projects;
  let _tasks = tasks;
  let _notes = notes;

  const addProject = (project) => {
    _projects.push(project);
  }

  const addTask = (task) => {
    _tasks.push(task);
  }

  const addNote = (note) => {
    _notes.push(note);
  }

  const removeProject = (project) => {
    for (let i = 0; i < projects.length; i++) {
      if (_projects[i] === project) {
        found = 1;
      };
      
      _projects[i] = _projects[i+found];
    }
  }

  const removeTask = (task) => {
    for (let i = 0; i < _tasks.length; i++) {
      if (_tasks[i] === task) {
        found = 1;
      };
      
      _tasks[i] = _tasks[i+found];
    }
  }

  const removeNote = (note) => {
    for (let i = 0; i < _notes.length; i++) {
      if (_notes[i] === note) {
        found = 1;
      };
      
      _notes[i] = _notes[i+found];
    }
  }

  const getProjects = () => {
    return _projects;
  }

  const getTasks = () => {
    return _tasks;
  }

  const getNotes = () => {
    return _notes;
  }

  return {
    addProject,
    addTask,
    addNote,
    removeProject,
    removeTask,
    removeNote,
    getProjects,
    getTasks,
    getNotes
  }
}
