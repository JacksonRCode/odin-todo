
import "./base-styles.css";
import "./styles.css";

import createUser from "./user";
import createFormListeners from "./formEventListeners";
import createBodyListeners from "./formEventListeners";

const user1 = createUser("Jackson", [],[],[]);

// console.log(user1.getUserName())

createBodyListeners(user1);
createFormListeners(user1);
