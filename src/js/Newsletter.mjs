function newsletterTemplate(){
    return ` <div id="newsMessage">
                <h2>Sign up For our Newsletter:</h2>
                <p>Get ready to embark on unforgettable adventures under the stars with our top-quality camping gear. 
                Stay tuned for exclusive deals. 
                </p>
            </div>
            <form id="inputNews">
                <label>Enter Your email:<input type="email" name="email" id="email" required></label>
                <button type="submit" id="newsButton">Subscribe</button>
            </form>`
}

function renderNewsletterTemplate(){
    const newsSection = document.querySelector("#Newsletter");
    newsSection.insertAdjacentHTML("afterbegin", newsletterTemplate())
    const emailInput = document.querySelector("#email");
    document.querySelector("#newsButton").addEventListener("click", () => {
        if (emailInput.value.trim() !== ""){
            document.querySelector("#inputNews").innerHTML = "<p>&#10004</p>";
        }
    });
}

export default class Newsletter{
    constructor(email){
        this.email = email;
    }
    init(){
        renderNewsletterTemplate();
    }
    
}