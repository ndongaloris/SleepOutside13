import { getLocalStorage } from "./utils.mjs";
import {superscriptNumber } from "./SuperScriptNumber.js"

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");
  if (cartItems === undefined || cartItems === null) cartItems = [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  superscriptNumber();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <div class="cart-card__del-btn">
    <span id="removeFromCart" data-id="${item.Id}">X</span>
  </div>
</li>`;

  return newItem;
}

renderCartContents();

// Add event listener to all "Remove" buttons dynamically
document.addEventListener('click', function(event) {
  if (event.target.id === 'removeFromCart') {
    const prodId = event.target.dataset.id;
    removeFromCart(prodId);
  }
});


