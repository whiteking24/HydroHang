// Initialize cart and wishlist arrays in localStorage if they don't exist
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}
if (!localStorage.getItem('wishlist')) {
    localStorage.setItem('wishlist', JSON.stringify([]));
}

// Function to show a small message near the product
function showMessageOnProduct(productElement, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'product-message';
    messageDiv.innerText = message;

    // Append the message near the product
    productElement.appendChild(messageDiv);

    // Remove the message after 2 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 2000);
}

// Function to add a product to the cart
function addToCart(product, productElement) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    showMessageOnProduct(productElement, 'Added to Cart');
    updateCartCount();
    displayCartItems();
}

// Function to add a product to the wishlist
function addToWishlist(product, productElement) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist'));
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    showMessageOnProduct(productElement, 'Added to Wishlist');
    updateWishlistCount();
    displayWishlistItems();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

// Function to remove an item from the wishlist
function removeFromWishlist(index) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist'));
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    displayWishlistItems();
}

// Function to update the cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartCount = document.querySelector('.fa-shopping-cart');
    cartCount.setAttribute('data-count', cart.length);
}

// Function to update the wishlist count in the header
function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist'));
    const wishlistCount = document.querySelector('.fa-heart');
    wishlistCount.setAttribute('data-count', wishlist.length);
}

// Function to display cart items in the dropdown
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartDropdown = document.getElementById('cart-dropdown');

    if (cart.length === 0) {
        cartDropdown.innerHTML = `<p class="empty-message">Your cart is empty.</p>`;
        return;
    }

    cartDropdown.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.price}</p>
                <button class="btn buy-now">Buy Now</button>
            </div>
            <span class="remove-btn" onclick="removeFromCart(${index})">&times;</span>
        </div>
    `).join('');
}

// Function to display wishlist items in the dropdown
function displayWishlistItems() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist'));
    const wishlistDropdown = document.getElementById('wishlist-dropdown');

    if (wishlist.length === 0) {
        wishlistDropdown.innerHTML = `<p class="empty-message">Your wishlist is empty.</p>`;
        return;
    }

    wishlistDropdown.innerHTML = wishlist.map((item, index) => `
        <div class="wishlist-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="wishlist-item-details">
                <h3>${item.name}</h3>
                <p>${item.price}</p>
            </div>
            <span class="remove-btn" onclick="removeFromWishlist(${index})">&times;</span>
        </div>
    `).join('');
}

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productElement = button.closest('.box');
        const product = {
            name: productElement.querySelector('h3').innerText,
            price: productElement.querySelector('.price').innerText,
            image: productElement.querySelector('img').src,
        };
        addToCart(product, productElement);
    });
});

// Add event listeners to all "Add to Wishlist" buttons (heart icons)
document.querySelectorAll('.fa-heart').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        const productElement = icon.closest('.box');
        const product = {
            name: productElement.querySelector('h3').innerText,
            price: productElement.querySelector('.price').innerText,
            image: productElement.querySelector('img').src,
        };
        addToWishlist(product, productElement);
    });
});

// Toggle cart dropdown when the cart icon is clicked
document.querySelector('.fa-shopping-cart').addEventListener('click', (e) => {
    e.preventDefault();
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.classList.toggle('active');
});

// Toggle wishlist dropdown when the wishlist icon is clicked
document.querySelector('.fa-heart').addEventListener('click', (e) => {
    e.preventDefault();
    const wishlistDropdown = document.getElementById('wishlist-dropdown');
    wishlistDropdown.classList.toggle('active');
});
// Check if a user is logged in
function isLoggedIn() {
    return localStorage.getItem('user') !== null;
}

// Display user details if logged in
function displayUserDetails() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('user-name').innerText = user.name;
        document.getElementById('user-email').innerText = user.email;
        document.getElementById('auth-forms').style.display = 'none';
        document.getElementById('user-details').style.display = 'block';
    } else {
        document.getElementById('auth-forms').style.display = 'block';
        document.getElementById('user-details').style.display = 'none';
    }
}

// Show the user modal
function showUserModal() {
    const modal = document.getElementById('user-modal');
    modal.style.display = 'block';
    displayUserDetails();
}

// Close the user modal
function closeUserModal() {
    const modal = document.getElementById('user-modal');
    modal.style.display = 'none';
}

// Handle Sign In
document.getElementById('signin-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    // Simulate authentication (replace with backend API call in real-world apps)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        displayUserDetails();
        alert('Sign In Successful!');
    } else {
        alert('Invalid email or password.');
    }
});

// Handle Sign Up
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Simulate user registration (replace with backend API call in real-world apps)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(u => u.email === email);

    if (userExists) {
        alert('User already exists. Please sign in.');
    } else {
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('user', JSON.stringify(newUser));
        displayUserDetails();
        alert('Sign Up Successful!');
    }
});

// Switch between Sign In and Sign Up forms
document.getElementById('switch-to-signup').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signin-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
});

document.getElementById('switch-to-signin').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('signin-form').style.display = 'block';
});

// Handle Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('user');
    displayUserDetails();
    alert('Logged out successfully.');
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    const modal = document.getElementById('user-modal');
    if (e.target === modal) {
        closeUserModal();
    }
});

// Close modal when clicking the close button
document.querySelector('.close-modal').addEventListener('click', closeUserModal);

// Open user modal when clicking the user icon
document.querySelector('.fa-user').addEventListener('click', showUserModal);
// Initialize cart and wishlist counts on page load
updateCartCount();
updateWishlistCount();
displayCartItems();
displayWishlistItems();