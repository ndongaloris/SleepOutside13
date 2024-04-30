import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails{
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init(){
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // once we have the product details we can render out the HTML
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        // add listener to Add to Cart button
        document.getElementById("addToCart").addEventListener("click", this.addToCartHandler);
    }
    // add to cart button event 
    addProductToCart() {
        setLocalStorage("so-cart", this.product);
    }
    
    renderProductDetail(){
        // Use the HTML in the /product_pages/index.html as a template to create this function. Once you have the function working remember to remove the HTML from the index.html file so you don't have multiple products showing up!
    }
}




