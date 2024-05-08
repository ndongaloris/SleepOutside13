import { loadHeaderFooter } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";

loadHeaderFooter(); 

const cart = new shoppingCart("so-cart", ".product-list");
cart.renderCartContents();
