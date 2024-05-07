import ProductData from "../js/ProductData.mjs"
import productList from "./ProductList.mjs"
import Alert from "../js/Alert.js"
import { loadHeaderFooter } from "./utils.mjs"

loadHeaderFooter();

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const products = new productList("tents", dataSource, listElement);
const alert = new Alert();

products.init();
alert.displayAlerts();