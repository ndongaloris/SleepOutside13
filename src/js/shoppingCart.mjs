import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
    <picture>
        <source srcset="${item.Images.PrimaryMedium}" media="(max-width: 700px)">
        <img
            src=${item.Images.PrimaryLarge}
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
        <div class="itemQuantity" data-id="${item.Id}">
            <p id="minus">-</p>
            <input class="num" type="number" value=${item.qty} min=1 max="10"> 
            <p id="plus">+</p>
        </div>
    </li>`;
    
    return newItem;
}
function checkoutSummary(){
    return ` <a href="../checkout/index.html">PROCEED TO CHECKOUT</a>`
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
        if (cartItems.length > 0){
            document.querySelector("#product-summary").insertAdjacentHTML("afterbegin", checkoutSummary());
        }
        cartItemQuantity(this.key);
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

// Function to handle updating quantity of items in the cart
function cartItemQuantity(key){
    // Retrieve cart items from local storage
    let cartItems = getLocalStorage(key);
    
    // Event listeners for "minus" buttons
    document.querySelectorAll("#minus").forEach(element => {        
        element.addEventListener("click", (event) => {
            // Navigate to the parent element of the clicked minus button
            let parentElement = event.target.parentElement;

            // Retrieve product ID from the data attribute of the parent element
            const prodId = parentElement.dataset.id;

            // Find the product in cartItems array based on ID
            let foundProduct = cartItems.filter((item) => item.Id === prodId);
            let productIndex = cartItems.findIndex(item => item.Id === prodId);

            // Find the input element within the same parent element
            let qtyInput = parentElement.querySelector(".num");
            if (qtyInput) {
                // Decrement the quantity value
                let qtyValue = parseInt(qtyInput.value);
                qtyValue--; 

                // Update quantity and final price of the found product
                foundProduct[0].qty = qtyValue;
                foundProduct[0].FinalPrice = (foundProduct[0].ListPrice * qtyValue).toFixed(2);
            }

            // Replace the product at the same index with the updated product
            cartItems.splice(productIndex, 1, foundProduct[0]);

            // Update local storage with the modified cart items
            setLocalStorage("so-cart", cartItems);

            // If quantity becomes 0, remove the product from the cart
            if (foundProduct[0].qty === 0){
                removeFromCart(key, prodId);
            }

            // Reload the page
            window.location.reload();
        })
    })

    // Event listeners for "plus" buttons
    document.querySelectorAll("#plus").forEach(element => {        
        element.addEventListener("click", (event) => {
            // Navigate to the parent element of the clicked plus button
            let parentElement = event.target.parentElement;

            // Retrieve product ID from the data attribute of the parent element
            const prodId = parentElement.dataset.id;

            // Find the product in cartItems array based on ID
            let foundProduct = cartItems.filter((item) => item.Id === prodId);
            let productIndex = cartItems.findIndex(item => item.Id === prodId);
            
            // Find the input element within the same parent element
            let qtyInput = parentElement.querySelector(".num");
            if (qtyInput) {
                // Increment the quantity value
                let qtyValue = parseInt(qtyInput.value);
                qtyValue++; 

                // Update quantity and final price of the found product
                foundProduct[0].qty = qtyValue;
                foundProduct[0].FinalPrice = (foundProduct[0].ListPrice * qtyValue).toFixed(2);
            }

            // Replace the product at the same index with the updated product
            cartItems.splice(productIndex, 1, foundProduct[0]);

            // Update local storage with the modified cart items
            setLocalStorage("so-cart", cartItems);

            // Reload the page
            window.location.reload();
        })
    })
}
