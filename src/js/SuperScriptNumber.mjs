// Importing getLocalStorage function from utils.mjs
import { getLocalStorage } from "./utils.mjs";

// Async function to update the superscript number displaying the number of items in the cart
export async function superscriptNumber(){
    // Retrieve items from local storage
    let items = getLocalStorage("so-cart");
    // If no items found, set items count to 0
    if (items === null){
        items = 0;
    } else{
        // Count the number of items
        items = items.length;
    }
    // Select the element displaying the superscript number
    const number = await document.querySelector(".superscript-number");
    // Update the content of the element with the item count
    number.textContent = items;
}
