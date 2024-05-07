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

export function getParams(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false){
  const htmlString =  list.map(templateFn);
  if (clear === true){
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

function renderWithTemplate(templateFn, parentElement, data, position = "afterbegin", callback){
  parentElement.insertAdjacentHTML(position, templateFn);
  if (callback){
    callback(data);
  }
}

async function loadTemplate(path){
  const html = await fetch(path);
  const template = await html.text();  
  return template;
}
export async function loadHeaderFooter(){
  const header = await loadTemplate("../public/partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footer = await loadTemplate("../public/partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
  renderWithTemplate(footer, footerElement);
  superscriptNumber();
}

