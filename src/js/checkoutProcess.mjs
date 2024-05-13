import { setLocalStorage, getLocalStorage} from "./utils.mjs";


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
            this.subTotal += item.FinalPrice * item.qty;
        });
        this.calculateOrdertotal();
    }

    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.shipping = (this.itemTotal - 1) * 2 + 10;
        this.tax = this.subTotal * 0.06;
        this.orderTotal = this.tax + this.subTotal + this.shipping;

        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        document.querySelector("#itemTotal").textContent = `(${this.itemTotal}) Items`;
        document.querySelector("#subTotal").textContent = Math.round(this.subTotal);
        document.querySelector("#tax").textContent = Math.round(this.tax);
        document.querySelector("#shipping").textContent = this.shipping;
        document.querySelector("#orderTotal").textContent = Math.round(this.orderTotal,2);
    }
    renderPaymentTemplate(){
        document.querySelector(this.selector)
        .insertAdjacentHTML("afterbegin", paymentTemplate());
    }
}
