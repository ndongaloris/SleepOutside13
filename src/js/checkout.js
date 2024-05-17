// Importing loadHeaderFooter function from utils.mjs
import { loadHeaderFooter } from "./utils.mjs";
// Importing checkoutProcess class from checkoutProcess.mjs
import checkoutProcess from "./checkoutProcess.mjs";

// Loading header and footer templates
loadHeaderFooter();

// Initializing checkout process
const checkingOut = new checkoutProcess("so-cart", "#payment");
checkingOut.init();

// Event listener for blur event on zip input field to recalculate order total
document
    .querySelector("#zip")
    .addEventListener("blur", checkingOut.calculateOrdertotal.bind(checkingOut));

// Event listener for click event on checkout button
document.querySelector("#checkoutButton").addEventListener("click", (e) => {
    e.preventDefault();

    // Accessing checkout form
    const myForm = document.forms["checkout"];
    // Validating form
    const chk_status = myForm.checkValidity();
    // Displaying validation message if form is invalid
    myForm.reportValidity();
    // Proceeding with checkout process if form is valid
    if(chk_status)
        checkingOut.checkout(myForm);
});
