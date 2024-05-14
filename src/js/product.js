import { getParams } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const productId = getParams("product");
let dataSource = new ExternalServices("tents");
dataSource.getData("tents");
const product = new ProductDetails(productId, dataSource);
product.init();