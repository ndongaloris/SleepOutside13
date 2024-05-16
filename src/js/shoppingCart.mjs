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
        <div id="color-price">
            <p class="cart-card__color">${item.Colors[0].ColorName}</p>
            <p class="cart-card__price">$${item.FinalPrice}</p>
        </div>
        <div class="cart-card__del-btn">
        <a href="#" id="removeFromCart" data-id="${item.Id}">&#9746;</a>
        </div>
        <div class="itemQuantity">
            <p id="minus">-</p>
            <input class="num" type="number" value=${item.qty} min=1 max="10"> 
            <p id="plus">+</p>
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
        cartItemQuantity();
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

function cartItemQuantity(){
    const cartItems =  getLocalStorage("so-cart");

    document.querySelectorAll("#minus").forEach(element => {        
        element.addEventListener("click", (event) =>{
            // Navigate to the parent element of the clicked minus button
            let parentElement = event.target.parentElement;

            const prodId = event.target.dataset.id;

            const productIndex =  cartItems.findIndex(item => item.id === prodId)

            let productQty = cartItems[productIndex].qty;
            let productPrice = cartItems[productIndex].FinalPrice;

            // Find the input element within the same parent element
            let qtyInput = parentElement.querySelector(".num");
            if (qtyInput) {
                // Decrement the value
                let qtyValue = parseInt(qtyInput.value);
                qtyValue--; 
                qtyInput.value = qtyValue;
                productQty = qtyValue;
                productPrice = productPrice * productQty;
            }
        })
    })
    document.querySelectorAll("#plus").forEach(element => {        
        element.addEventListener("click", (event) =>{
            // Navigate to the parent element of the clicked minus button
            let parentElement = event.target.parentElement;
            // Find the input element within the same parent element
            let qtyInput = parentElement.querySelector(".num");
            if (qtyInput) {
                // Decrement the value
                let qtyValue = parseInt(qtyInput.value);
                qtyValue++; 
                qtyInput.value = qtyValue;
            }
        })
    })
}