// Product Data
const products = [
    {
        id: 1,
        name: "Minimalist Watch",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 199.50,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400"
    },
    {
        id: 3,
        name: "Eco-Friendly Flask",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1602143302703-f75d77681471?q=80&w=400"
    },
    {
        id: 4,
        name: "Luxe Camera",
        price: 850.00,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=400"
    },
    {
        id: 5,
        name: "Leather Backpack",
        price: 145.00,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400"
    },
    {
        id: 6,
        name: "Smart Speaker",
        price: 89.00,
        image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=400"
    }
];

// Cart State
let cart = [];

// DOM Elements
const productList = document.getElementById('product-list');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalAmount = document.getElementById('cart-total-amount');
const cartCount = document.querySelector('.cart-count');

// Initialize Products
function displayProducts() {
    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Cart Logic
function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    // Optional: Open cart when item is added
    if (!cartSidebar.classList.contains('active')) {
        toggleCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    // Update items list
    cartItemsContainer.innerHTML = cart.length === 0 
        ? '<p style="text-align:center; color:#666; margin-top:2rem;">Your cart is empty</p>'
        : cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');

    // Update total
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotalAmount.textContent = `$${total.toFixed(2)}`;

    // Update count
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = count;
}

// Event Listeners
cartIcon.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// Start
displayProducts();
updateCartUI();
