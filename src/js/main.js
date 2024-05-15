import Alert from "../js/Alert.js"
import { loadHeaderFooter } from "./utils.mjs"
import Newsletter from "./Newsletter.mjs";

loadHeaderFooter();

const alert = new Alert();
alert.displayAlerts();

const newsletter = new Newsletter();
newsletter.init();