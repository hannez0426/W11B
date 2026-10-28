
// W11B - Checkout Page

// Select HTML elements
let cartItems = document.getElementById("cart-items");
let totalPrice = document.getElementById("total-price");
let cartSummary = document.getElementById("cart-summary");
let clearButton = document.getElementById("clear-cart");

// Get the cart from cookies
function getCart() {
    let savedCart = Cookies.get("cart");

    if (savedCart) {
        return JSON.parse(savedCart);
    }

    return [];
}

// Display all items in the cart
function displayCart() {

    let cart = getCart();
    let total = 0;

    // Clear previous displayed items
    cartItems.innerHTML = "";

    // Check if the cart is empty
    if (cart.length === 0) {
        cartItems.innerHTML = "<p class='empty-cart'>You don't have anything picked yet!</p>";
        cartSummary.style.display = "none";
        return;
    }

    // Show summary when cart has items
    cartSummary.style.display = "block";

    // Loop through every item in the cart
    for (let i = 0; i < cart.length; i++) {

        let item = cart[i];

        // Add item price to total
        total += item.price;

        // Display each selected item
        cartItems.insertAdjacentHTML("beforeend", `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">

                <div class="cart-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                </div>

                <button class="delete-btn" onclick="deleteItem(${i})">
                    Delete
                </button>
            </div>
        `);
    }

    // Display total price
    totalPrice.innerText = total.toFixed(2);
}

// BONUS: Delete only one selected item
function deleteItem(index) {

    let cart = getCart();

    // Remove only one item at the selected index
    cart.splice(index, 1);

    // Save updated cart
    Cookies.set("cart", JSON.stringify(cart), {
        expires: 7,
        sameSite: "Lax"
    });

    // Refresh displayed cart
    displayCart();
}

// BONUS: Clear all items
function clearCart() {

    // Remove the cart cookie completely
    Cookies.remove("cart");

    // Refresh displayed cart
    displayCart();
}

// Clear cart button event
clearButton.addEventListener("click", clearCart);

// Display cart when page loads
displayCart();
