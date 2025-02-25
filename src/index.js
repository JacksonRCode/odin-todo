
import "./base-styles.css";
import "./styles.css";
import "./cardStyles.css";

import createUser from "./user";
import createFormListeners from "./formEventListeners";
import createBodyListeners from "./bodyEventListeners";
import { createTask } from "./task";

const user1 = createUser("Jackson", [],[],[]);

const task1 = createTask("Shower", "Water", "2025-02-25", "Low", false);
const task2 = createTask("Eat", "Food", "2025-02-25", "Medium", false);
const task3 = createTask("Work", "AHH", "2025-02-25", "High", false);
const task4 = createTask("Workout", "IRON", "2025-02-25", "High", false);

// Add task to user
user1.addTask(task1);
user1.addTask(task2);
user1.addTask(task3);
user1.addTask(task4);

// console.log(user1.getUserName())

createBodyListeners(user1);
createFormListeners(user1);
