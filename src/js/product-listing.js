import { loadHeaderFooter, getParams } from "./utils.mjs";
import productList from "./ProductList.mjs"
import ProductData from "../js/ProductData.mjs"

loadHeaderFooter();

const category = getParams("category");
document.querySelector(".productHeader").textContent += `: ${category.charAt(0).toUpperCase()}${category.substring(1)}`;
// first create an instance of our ProductData class.
const dataSource = new ProductData();
// then get the element we want the product list to render in
const listElement = document.querySelector(".product-list");
// then create an instance of our ProductList class and send it the correct information.
const myList = new productList(category, dataSource, listElement);
// finally call the init method to show our products

myList.init();
