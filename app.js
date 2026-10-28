
// W11B - Pokémon Shopping Cart

// Create an array of Pokémon products
let products = [
    {
        id: 1,
        name: "Pikachu",
        price: 19.99,
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    },
    {
        id: 2,
        name: "Charmander",
        price: 17.99,
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
    },
    {
        id: 3,
        name: "Squirtle",
        price: 18.99,
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
    },
    {
        id: 4,
        name: "Bulbasaur",
        price: 16.99,
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    },
    {
        id: 5,
        name: "Eevee",
        price: 21.99,
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png"
    },
    {
        id: 6,
        name: "Snorlax",
        price: 24.99,
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png"
    }
];

// Select HTML elements
let productList = document.getElementById("product-list");
let cartCount = document.getElementById("cart-count");
let message = document.getElementById("message");

// Get the saved cart from cookies
function getCart() {
    let savedCart = Cookies.get("cart");

    // If the cookie exists, convert it to an array
    if (savedCart) {
        return JSON.parse(savedCart);
    }

    // Otherwise return an empty array
    return [];
}

// Update the number displayed in the navigation
function updateCartCount() {
    let cart = getCart();
    cartCount.innerText = cart.length;
}

// Display products on the webpage
for (let i = 0; i < products.length; i++) {
    let product = products[i];

    productList.insertAdjacentHTML("beforeend", `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `);
}

// Add a selected product to the cart
function addToCart(productId) {

    // Get existing cart instead of creating a new one
    let cart = getCart();

    // Find the selected product
    let selectedProduct = products.find(function(product) {
        return product.id === productId;
    });

    // Add a NEW object to the cart array
    if (selectedProduct) {
        cart.push({...selectedProduct});

        // Save the updated array in the cookie
        Cookies.set("cart", JSON.stringify(cart), {
            expires: 7,
            sameSite: "Lax"
        });

        // Update the cart count
        updateCartCount();

        // Show confirmation
        message.innerText = selectedProduct.name + " added to cart!";
    }
}

// Show the saved cart count when the page loads
updateCartCount();
