import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

const checkingOut = new checkoutProcess("so-cart", "#payment");

checkingOut.init();

document
    .querySelector("#zip")
    .addEventListener("blur", checkingOut.calculateOrdertotal.bind(checkingOut));
    // listening for click on the button
    document.querySelector("#checkoutButton").addEventListener("click", (e) => {
    e.preventDefault();

    const myForm = document.forms[0];
    const chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if(chk_status)
        checkingOut.checkout(document.forms["checkout"]);
});