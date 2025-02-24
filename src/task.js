export { createTask, TaskManager };

function createTask(title, description, dueDate, priority, complete) {
  /*
    This function creates a task object and returns functions to view the objects values
    and change those values.
  */

  let _title = title;
  let _description = description;
  let _dueDate = dueDate;
  let _priority = priority;
  let _complete = complete;

  
  return {
    getTitle: () => _title,
    getDescription: () => _description,
    getDueDate: () => _dueDate,
    getPriority: () => _priority, 
    getComplete: () => _complete,

    setTitle: ( newTitle ) => { _title = newTitle },
    setDescription: ( newDescription ) => { _description = newDescription },
    setDueDate: ( newDueDate ) => { _dueDate = newDueDate },
    setPriority: ( newPriority ) => { _priority = newPriority },
    setComplete: ( newComplete ) => { _complete = newComplete },
  };
}

const TaskManager = {
  /*
    Centralized manager of tasks
  */ 

  changeTitle(task, value) {
    task.setTitle(value); 
  },
  changeDescription(task, value) {
    task.setDescription(value);
  },
  changeDueDate(task, value) {
    task.setDueDate(value);
  },
  changePriority(task, value) {
    task.setPriority(task, value);
  },
  markComplete(task) {
    task.setComplete(true);
  },
  markIncomplete(task) {
    task.setComplete(false);
  }
}

// const shower = createTask('Shower', "Go to bathroom and scrub the pits","today","high", 0);

// TaskManager.changeTitle(shower, "Bath");

// console.log(shower.getTitle());


