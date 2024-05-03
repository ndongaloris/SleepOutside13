import { setLocalStorage, getLocalStorage} from "./utils.mjs";
import { renderCartIconTemplate } from "./SuperScriptNumber";

function renderTemplate(product){
    return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    
    <img
        class="divider"
        src=${product.Image}
        alt=${product.Name}
    />

    <p class="product-card__price">${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>

    <div class="product-detail__add">
        <button id="addToCart" data-id=${product.Id}>Add to Cart</button>
    </div>
    </section>`
}

export default class ProductDetails{
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.productList = [];
        this.dataSource = dataSource;
    }
    async init(){
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // once we have the product details we can render out the HTML
        this.renderProductDetails("main");
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        // add listener to Add to Cart button
        document.getElementById("addToCart").addEventListener("click", this.addToCart.bind(this));
        document.getElementById("addToCart").addEventListener("click", () => {window.location.reload()});
    }
    addToCart(){
        this.productList = getLocalStorage("so-cart");
        if (this.productList === undefined || this.productList === null) this.productList = [];
        this.productList.push(this.product);
        setLocalStorage("so-cart", this.productList);
    }    
    renderProductDetails(selector){
        const element = document.querySelector(selector);
        element.insertAdjacentHTML("afterbegin", renderTemplate(this.product)
        );
    }
}


