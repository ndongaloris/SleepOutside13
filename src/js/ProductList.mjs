import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product){
    return `<li class="product-card">
                <a href="product_pages/?product=${product.Id}">
                <img
                    src=${product.Image}
                    alt=${product.Name}
                />
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
        const products = await this.dataSource.getData();
        const newList = this.tentFilter(products);
        this.renderList(newList);
    }
    renderList(list){
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }
    tentFilter(list){
        const allProductId = new Set(["880RR", "985RF", "985PR","344YJ"]);
        const newList = [];
        list.forEach(product => {
            if(allProductId.has(product.Id)){
                newList.push(product);
            }
        });
        return newList;
    }
}