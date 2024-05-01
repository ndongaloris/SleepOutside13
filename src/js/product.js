<<<<<<< HEAD
import ProductData from "./ProductData.mjs";
import { getParams } from "./utils.mjs";
=======
import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
>>>>>>> 4d0e61050cb42ba8f845318644455954549a0066
import ProductDetails from "./ProductDetails.mjs";

const productId = getParams("product");
const dataSource = new ProductData("tents");
const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);
product.init();