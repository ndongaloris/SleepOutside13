import { setLocalStorage, getLocalStorage, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  var productList = getLocalStorage("so-cart");
  if (productList === undefined || productList === null) productList = [];
  productList.push(product);
  setLocalStorage("so-cart", productList);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document.getElementById("addToCart").addEventListener("click", addToCartHandler);
