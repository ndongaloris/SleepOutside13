import ProductData from "../js/ProductData.mjs"
import productList from "./ProductList.mjs"

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const products = new productList("tents", dataSource, listElement);

products.init();