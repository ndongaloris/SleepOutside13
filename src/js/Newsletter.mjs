// Function to generate the newsletter template
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
            </form>`;
}

// Function to render the newsletter template
function renderNewsletterTemplate(){
    const newsSection = document.querySelector("#Newsletter");
    newsSection.insertAdjacentHTML("afterbegin", newsletterTemplate());
    const emailInput = document.querySelector("#email");
    // Event listener for newsletter subscription button
    document.querySelector("#newsButton").addEventListener("click", () => {
        if (emailInput.value.trim() !== ""){
            // Display checkmark icon upon successful subscription
            document.querySelector("#inputNews").innerHTML = "<p>&#10004;</p>";
        }
    });
}

// Class for managing newsletter subscription
export default class Newsletter{
    constructor(email){
        this.email = email;
    }
    // Method to initialize newsletter subscription
    init(){
        renderNewsletterTemplate();
    } 
}
