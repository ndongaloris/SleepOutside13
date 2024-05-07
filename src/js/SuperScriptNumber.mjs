import { getLocalStorage} from "./utils.mjs";

export async function superscriptNumber(){
    let items = getLocalStorage("so-cart");
    if (items === null){
        items = 0;
    } else{
        items  = items.length;
    }
    const number = await document.querySelector(".superscript-number");
    number.textContent = items;
}
