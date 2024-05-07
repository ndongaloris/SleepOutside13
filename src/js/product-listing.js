import { loadHeaderFooter } from "./utils.mjs";
import productList from "./ProductList.mjs"
import ProductData from "../js/ProductData.mjs"

loadHeaderFooter();

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const products = new productList("tents", dataSource, listElement);

products.init();

