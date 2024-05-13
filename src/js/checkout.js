import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

const checkingOut = new checkoutProcess("so-cart", "#payment");


checkingOut.init();