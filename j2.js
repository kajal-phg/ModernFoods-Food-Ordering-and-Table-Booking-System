// ================================
// MOBILE NAVIGATION
// ================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");
    });

    document.querySelectorAll(".nav-links a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
        });
    });
}
// ================================
// MENU CATEGORY FILTER
// ================================

// BUG FIX 1: HTML mein buttons ki class "category-btn" hai (pehle ".filter-btn" tha)
const filterButtons = document.querySelectorAll(".category-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        // Remove active class from all buttons
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");

        // BUG FIX 2: HTML mein attribute "data-category" hai (pehle "data-filter" tha)
        const category = button.getAttribute("data-category");

        menuCards.forEach(function (card) {
            const cardCategory = card.getAttribute("data-category");

            if (category === "all" || category === cardCategory) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
// ================================
// SHOPPING CART
// ================================

let cart = [];

const cartButton = document.getElementById("cartButton");
const cartDropdown = document.getElementById("cartDropdown");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");


// Open and close cart
if (cartButton && cartDropdown) {
    cartButton.addEventListener("click", function () {
        cartDropdown.classList.toggle("active");
    });
}
// Add food item to cart
function addFood(name, price) {
    const existingItem = cart.find(function (item) {
        return item.name === name;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}
// Add button functionality
document.querySelectorAll(".add-button").forEach(function (button) {
    button.addEventListener("click", function () {

        const card = button.closest(".menu-card");

        if (!card) return;

        const name = card.getAttribute("data-name");
        const price = Number(card.getAttribute("data-price"));

        if (name && Number.isFinite(price)) {
            addFood(name, price);
        }
    });
});
// Increase or decrease quantity
function changeQuantity(name, change) {
    const item = cart.find(function (food) {
        return food.name === name;
    });

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(function (food) {
            return food.name !== name;
        });
    }

    updateCart();
}
// Update cart display
function updateCart() {

    if (!cartItems || !cartCount || !cartTotal) return;

    cartItems.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(function (item) {

        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>

            <div class="quantity-controls">
                <button class="quantity-btn decrease-btn" type="button">−</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase-btn" type="button">+</button>
            </div>
        `;

        const decreaseButton = cartItem.querySelector(".decrease-btn");
        const increaseButton = cartItem.querySelector(".increase-btn");

        decreaseButton.addEventListener("click", function () {
            changeQuantity(item.name, -1);
        });

        increaseButton.addEventListener("click", function () {
            changeQuantity(item.name, 1);
        });

        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = totalItems;
    cartTotal.textContent = "₹" + totalPrice;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
    }
}
// ================================
// BOOKING DATE VALIDATION
// ================================

const bookingDate = document.getElementById("bookingDate");

function setMinimumBookingDate() {
    if (!bookingDate) return;

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    bookingDate.min = `${year}-${month}-${day}`;
}

setMinimumBookingDate();
// ================================
// TABLE BOOKING FORM
// ================================

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("bookingName").value.trim();
        const phone = document.getElementById("bookingPhone").value.trim();
        const date = document.getElementById("bookingDate").value;
        const time = document.getElementById("bookingTime").value;
        const guests = document.getElementById("guestCount").value;

        if (!name || !phone || !date || !time || !guests) {
            alert("Please fill in all booking details.");
            return;
        }

        const selectedDate = new Date(date + "T00:00:00");
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            alert("Please select today or a future date.");
            return;
        }

        alert(
            "Thank you, " + name + "!\n\n" +
            "Your booking request has been received.\n" +
            "Date: " + date + "\n" +
            "Time: " + time + "\n" +
            "Guests: " + guests
        );

        bookingForm.reset();
        setMinimumBookingDate();
    });
}
// ================================
// CONTACT FORM
// ================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all contact details.");
            return;
        }

        alert(
            "Thank you, " + name + "!\n\n" +
            "Your message has been received."
        );

        contactForm.reset();
    });
}