import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const productId = getParams("product");
let dataSource = new ProductData("tents");
dataSource.getData("tents");
const product = new ProductDetails(productId, dataSource);
product.init();