import ExternalServices from "./ExternalServices.mjs";
import {getLocalStorage, setLocalStorage} from "./utils.mjs";

const services = new ExternalServices();

function paymentTemplate(){
    return `<table>
                <tr>
                    <th>Your Order</th>
                    <th></th>
                </tr>
                <tr>
                    <td id="itemTotal"></td>
                    <td id="subTotal"></td>
                </tr>
                <tr>
                    <td>Shipping</td>
                    <td id="shipping"></td>
                </tr>
                <tr>
                    <td>Vat (Incl.)</td>
                    <td id="tax"></td>
                </tr>
                <tr>
                    <th>Total</th>
                    <th id="orderTotal"></th>
                </tr>
            </table>`;
}

function formatDataToJSON(element){
    const formatData = new FormData(element),
    convertedJSON = {};

    formatData.forEach(function(value, key){
        convertedJSON[key] = value;
    })
    return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
    // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
    const packageOfItems = items.map((item) => {
        console.log(item);
        return { id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: item.qty,
        }
    });
    return packageOfItems;
}

export default class checkoutProcess{
    constructor(key, selector){
        this.key = key;
        this.selector = selector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.subTotal = 0;
        this.orderTotal = 0;
    }
    init(){
        this.list = getLocalStorage(this.key);
        this.renderPaymentTemplate();
        this.calculateItemSummary();
    }
    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        this.list.forEach(item => {
            this.itemTotal += item.qty;
            this.subTotal += Math.round(item.FinalPrice * item.qty, 2);
        });
        this.calculateOrdertotal();
    }

    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.shipping = Math.round((this.itemTotal - 1) * 2 + 10, 2);
        this.tax = Math.round(this.subTotal * 0.06, 2);
        this.orderTotal = Math.round(this.tax + this.subTotal + this.shipping, 2);

        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        document.querySelector("#itemTotal").textContent = `(${this.itemTotal}) Items`;
        document.querySelector("#subTotal").textContent = this.subTotal;
        document.querySelector("#tax").textContent = this.tax;
        document.querySelector("#shipping").textContent = this.shipping;
        document.querySelector("#orderTotal").textContent = this.orderTotal;
    }
    renderPaymentTemplate(){
        document.querySelector(this.selector)
        .insertAdjacentHTML("afterbegin", paymentTemplate());
    }
    async checkout(form) {
        // build the data object from the calculated fields, the items in the cart, and the information entered into the form
        // const formElement = document.forms["checkout"];
        const json = formatDataToJSON(form);
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.subTotal = this.subTotal;
        json.items = packageItems(this.list);
        console.log(json);

        
        // call the checkout method in our ExternalServices module and send it our data object.
        try {
            const res = await services.checkout(json);
            console.log(res);
            setLocalStorage("so-cart", []);
            location.assign("/checkout/success.html");
        } catch (err) {
            console.log(err);
        }
    }
}

