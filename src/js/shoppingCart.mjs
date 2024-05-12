import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
    <picture>
        <source srcset="${item.Images.PrimarySmall}" media="(max-width: 700px)">
        <img
            src=${item.Images.PrimaryMedium}
            alt=${item.Name}>
    </picture>
        </a>
        <a href="#">
        <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: ${item.qty}</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
        <div class="cart-card__del-btn">
        <a href="#" id="removeFromCart" data-id="${item.Id}">&#9746;</a>
        </div>
    </li>`;
    
    return newItem;
}

export default class shoppingCart{
    constructor(key, productList){
        this.key = key;
        this.productList = productList;
    }
    renderCartContents() {
        let cartItems = getLocalStorage(this.key);
        if (cartItems === undefined || cartItems === null) cartItems = [];
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        document.querySelector(this.productList).innerHTML = htmlItems.join("");
        removeItems(this.key);
    }
}

// Add event listener to all "Remove" buttons dynamically
function removeItems(key){
    document.querySelectorAll("#removeFromCart").forEach(element => {
    element.addEventListener("click", function(event) {
        if (event.target.id === "removeFromCart") {
        const prodId = event.target.dataset.id;
        removeFromCart(key, prodId);
        }
    });
    });
}
function removeFromCart(key, prodId) {
    let cartItems = getLocalStorage(key);
    const index = cartItems.findIndex(item => item.Id === prodId);

    if (index !== -1){
        cartItems.splice(index, 1);
    }
    // Update local storage with the new cart items
    setLocalStorage(key,cartItems)
    // Re-render the cart contents to reflect the changes
    window.location.reload();
}