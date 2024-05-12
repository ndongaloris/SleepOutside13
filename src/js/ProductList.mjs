import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product){
    return `<li class="product-card">
                <a href="../product_pages/index.html?product=${product.Id}">
                <picture>
                <source srcset="${product.Images.PrimarySmall}" media="(max-width: 700px)">
                    <img
                    src=${product.Images.PrimaryMedium}
                    alt=${product.Name}>
                </picture>
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.Name}</h2>
                <p class="product-card__price">${product.FinalPrice}</p></a
                >
            </li>`
}

export default class productList{
    constructor(category, dataSource, listElement){
        this.dataSource = dataSource;
        this.category = category;
        this.listElement = listElement;
    }
    async init(){
        
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
    }
    renderList(list){
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }
}