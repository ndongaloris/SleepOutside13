// Importing renderListWithTemplate function from utils.mjs
import { renderListWithTemplate } from "./utils.mjs";

// Function to generate product card template
function productCardTemplate(product) {
  console.log(product);
  // Check if product is discounted
  const discounted = product.FinalPrice < product.SuggestedRetailPrice;
  // Calculate discount percentage
  const discount = ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100;
  // Generate product card HTML
  return `<li class="product-card">
                <a href="../product_pages/index.html?product=${product.Id}">
                ${discounted ? `<div class="discount"> ${Math.round(discount)}% off</div>` : ""}
                <picture>
                <source srcset="${product.Images.PrimaryMedium}" media="(max-width: 400px)">
                <source srcset="${product.Images.PrimaryLarge}" media="(max-width: 800px)">
                    <img
                    src="${product.Images.PrimaryExtraLarge}"
                    alt="${product.Name}">
                </picture>
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.Name}</h2>
                <p class="product-card__price">${product.FinalPrice}</p></a
                >
            </li>`;
}

// Class for managing product list
export default class productList {
  constructor(category, dataSource, listElement) {
    this.dataSource = dataSource;
    this.category = category;
    this.listElement = listElement;
  }
  // Method to initialize product list
  async init() {
    // Fetch product data
    const list = await this.dataSource.getData(this.category);
    console.log(list);
    // Render product list
    this.renderList(list);
  }
  // Method to render product list
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
