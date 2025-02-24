
import "./base-styles.css";
import "./styles.css";

import createUser from "./user";
import createListeners from "./eventListeners";

const user1 = createUser("Jackson", [],[],[]);

// console.log(user1.getUserName())

createListeners(user1);