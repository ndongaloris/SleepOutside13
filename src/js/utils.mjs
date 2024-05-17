import { superscriptNumber } from "./SuperScriptNumber.mjs";
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Function to retrieve parameter value from the URL query string
export function getParams(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// Function to render a list using a template function and insert it into a parent element
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false){
  const htmlString =  list.map(templateFn);
  // If clear parameter is set to true, clear the parent element's inner HTML
  if (clear === true){
    parentElement.innerHTML = "";
  }
  // Insert the HTML string into the parent element at the specified position
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

// Function to render HTML template into a parent element, optionally executing a callback function
function renderWithTemplate(templateFn, parentElement, data, position = "afterbegin", callback){
  // Insert the HTML template into the parent element at the specified position
  parentElement.insertAdjacentHTML(position, templateFn);
  // If a callback function is provided, execute it with the data parameter
  if (callback){
    callback(data);
  }
}

// Async function to load an HTML template from a specified path
async function loadTemplate(path){
  // Fetch the HTML template from the provided path
  const html = await fetch(path);
  // Convert the fetched HTML to text
  const template = await html.text();  
  // Return the HTML template
  return template;
}

// Async function to load header and footer templates and render them in corresponding elements
export async function loadHeaderFooter(){
  // Load the header template
  const header = await loadTemplate("../partials/header.html");
  // Select the header element
  const headerElement = document.querySelector("#main-header");
  // Load the footer template
  const footer = await loadTemplate("../partials/footer.html");
  // Select the footer element
  const footerElement = document.querySelector("#main-footer");

  // Render the header template in the header element
  renderWithTemplate(header, headerElement);
  // Render the footer template in the footer element
  renderWithTemplate(footer, footerElement);
  // Render the footer template in the footer element again (this appears to be redundant)
  renderWithTemplate(footer, footerElement);
  // Execute the superscriptNumber function (assuming it's defined elsewhere)
  superscriptNumber();
}


export function alertMessage(message, scroll = true){
  const alertElement = document.querySelector(".alertMessage")
  alertElement.innerHTML = `<p>${message}</p> <span>X</span>`
  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alertElement.addEventListener("click", function(e) {
    if(e.target.tagName == "SPAN") { // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
        main.removeChild(this);
      }
  })
  // add the alert to the top of main
  const main = document.querySelector("main");
  main.prepend(alertElement);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll)
    window.scrollTo(0,0);
}
export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alertMessage");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}