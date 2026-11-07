/* =========================================================
   SYNORA - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   1. DARK / LIGHT MODE
========================================================= */

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("synora-theme") === "dark") {
    document.body.classList.add("dark");
}

function updateThemeIcon() {
    if (!themeBtn) {
        return;
    }

    if (document.body.classList.contains("dark")) {
        themeBtn.innerHTML = "☀";
    } else {
        themeBtn.innerHTML = "◐";
    }
}

updateThemeIcon();

if (themeBtn) {
    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("synora-theme", "dark");
        } else {
            localStorage.setItem("synora-theme", "light");
        }

        updateThemeIcon();
    });
}


/* =========================================================
   2. MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {
            menuBtn.innerHTML = "✕";
        } else {
            menuBtn.innerHTML = "☰";
        }

    });

    const navItems = navLinks.querySelectorAll("a");

    navItems.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuBtn.innerHTML = "☰";

        });

    });
}


/* =========================================================
   3. CART DATA
========================================================= */

let cart = [];

try {

    const savedCart = localStorage.getItem("synora-cart");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    if (!Array.isArray(cart)) {
        cart = [];
    }

} catch (error) {

    cart = [];

}


/* =========================================================
   4. SAVE CART
========================================================= */

function saveCart() {

    localStorage.setItem(
        "synora-cart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   5. CART COUNT
========================================================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) {
        return;
    }

    let totalItems = 0;

    cart.forEach(function (item) {

        totalItems += Number(item.quantity) || 0;

    });

    cartCount.innerHTML = totalItems;

}

updateCartCount();


/* =========================================================
   6. ADD PRODUCT TO CART
========================================================= */

function addToCart(product) {

    if (!product) {
        return;
    }

    const existingProduct = cart.find(function (item) {

        return item.id === product.id;

    });


    if (existingProduct) {

        existingProduct.quantity =
            Number(existingProduct.quantity) + 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            brand: product.brand,

            price: Number(product.price),

            image: product.image,

            category: product.category,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    showMessage(
        product.name + " added to cart"
    );

}


/* =========================================================
   7. PRODUCT ADD TO CART BUTTONS
========================================================= */

const addButtons =
    document.querySelectorAll(".add-cart");


addButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        const card =
            button.closest(".product-card");

        if (!card) {
            return;
        }


        const nameElement =
            card.querySelector(".product-name");

        const brandElement =
            card.querySelector(".product-brand");

        const priceElement =
            card.querySelector(".product-price");

        const imageElement =
            card.querySelector("img");


        const productName =
            card.getAttribute("data-name") ||
            (nameElement
                ? nameElement.textContent.trim()
                : "SYNORA Product");


        const productBrand =
            card.getAttribute("data-brand") ||
            (brandElement
                ? brandElement.textContent.trim()
                : "SYNORA");


        let productPrice =
            card.getAttribute("data-price");


        if (!productPrice && priceElement) {

            productPrice =
                priceElement.textContent
                    .replace(/[^0-9.]/g, "");

        }


        productPrice =
            Number(productPrice) || 0;


        const productImage =
            card.getAttribute("data-image") ||
            (imageElement
                ? imageElement.src
                : "");


        const productCategory =
            card.getAttribute("data-category") ||
            "all";


        const productId =
            card.getAttribute("data-id") ||
            productName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-");


        const product = {

            id: productId,

            name: productName,

            brand: productBrand,

            price: productPrice,

            image: productImage,

            category: productCategory

        };


        addToCart(product);

    });

});


/* =========================================================
   8. CART MESSAGE
========================================================= */

function showMessage(text) {

    const oldMessage =
        document.querySelector(".synora-message");

    if (oldMessage) {
        oldMessage.remove();
    }


    const message =
        document.createElement("div");


    message.className =
        "synora-message";


    message.textContent = "✓ " + text;


    message.style.position = "fixed";
    message.style.right = "20px";
    message.style.bottom = "20px";
    message.style.zIndex = "99999";
    message.style.padding = "15px 22px";
    message.style.borderRadius = "30px";
    message.style.background = "#111";
    message.style.color = "#fff";
    message.style.fontSize = "13px";
    message.style.fontWeight = "700";
    message.style.boxShadow =
        "0 15px 40px rgba(0,0,0,0.25)";


    document.body.appendChild(message);


    setTimeout(function () {

        message.remove();

    }, 2500);

}


/* =========================================================
   9. CART BUTTON
========================================================= */

const cartButton =
    document.getElementById("cartBtn");


if (cartButton) {

    cartButton.addEventListener("click", function () {

        openCart();

    });

}


/* =========================================================
   10. OPEN CART
========================================================= */

function openCart() {

    const oldCart =
        document.querySelector(".synora-cart");

    if (oldCart) {
        oldCart.remove();
    }


    const cartBox =
        document.createElement("div");


    cartBox.className =
        "synora-cart";


    cartBox.innerHTML = `

        <div class="synora-cart-overlay"></div>

        <div class="synora-cart-panel">

            <div class="synora-cart-header">

                <div>
                    <small>SYNORA</small>
                    <h2>Your Cart</h2>
                </div>

                <button
                    class="synora-close-cart">
                    ✕
                </button>

            </div>


            <div
                class="synora-cart-products">
            </div>


            <div class="synora-cart-footer">

                <div class="synora-total">
                    <span>Total</span>
                    <strong>Rs. 0</strong>
                </div>

                <button
                    class="synora-checkout">
                    Checkout
                </button>

            </div>

        </div>
    `;


    document.body.appendChild(cartBox);


    addCartStyles();


    renderCart();


    const closeButton =
        cartBox.querySelector(
            ".synora-close-cart"
        );


    const overlay =
        cartBox.querySelector(
            ".synora-cart-overlay"
        );


    closeButton.addEventListener(
        "click",
        function () {

            cartBox.remove();

        }
    );


    overlay.addEventListener(
        "click",
        function () {

            cartBox.remove();

        }
    );

}


/* =========================================================
   11. CART STYLES
========================================================= */

function addCartStyles() {

    if (
        document.getElementById(
            "synora-cart-styles"
        )
    ) {
        return;
    }


    const style =
        document.createElement("style");


    style.id =
        "synora-cart-styles";


    style.innerHTML = `

        .synora-cart-overlay {

            position: fixed;
            inset: 0;
            background: rgba(0,0,0,.55);
            z-index: 99998;

        }


        .synora-cart-panel {

            position: fixed;
            top: 0;
            right: 0;
            width: 450px;
            max-width: 92%;
            height: 100vh;
            background: var(--surface);
            color: var(--text);
            z-index: 99999;

            display: flex;
            flex-direction: column;

            box-shadow:
                -20px 0 60px
                rgba(0,0,0,.2);

            animation:
                synoraCartSlide .35s ease;

        }


        @keyframes synoraCartSlide {

            from {
                transform: translateX(100%);
            }

            to {
                transform: translateX(0);
            }

        }


        .synora-cart-header {

            padding: 25px;

            display: flex;

            justify-content:
                space-between;

            align-items: flex-start;

            border-bottom:
                1px solid var(--border);

        }


        .synora-cart-header small {

            color: var(--muted);

            font-size: 9px;

            letter-spacing: 3px;

        }


        .synora-cart-header h2 {

            margin-top: 5px;

            font-size: 28px;

        }


        .synora-close-cart {

            width: 40px;
            height: 40px;

            border:
                1px solid var(--border);

            border-radius: 50%;

            background: transparent;

            color: var(--text);

            cursor: pointer;

        }


        .synora-cart-products {

            flex: 1;

            overflow-y: auto;

            padding: 20px 25px;

        }


        .synora-cart-item {

            display: grid;

            grid-template-columns:
                75px 1fr;

            gap: 15px;

            padding: 18px 0;

            border-bottom:
                1px solid var(--border);

        }


        .synora-cart-item img {

            width: 75px;
            height: 90px;

            object-fit: cover;

            border-radius: 8px;

        }


        .synora-cart-item h4 {

            margin-bottom: 5px;

            font-size: 14px;

        }


        .synora-cart-brand {

            color: var(--muted);

            font-size: 9px;

            letter-spacing: 1px;

            margin-bottom: 7px;

        }


        .synora-cart-price {

            font-weight: 800;

        }


        .synora-cart-controls {

            display: flex;

            align-items: center;

            gap: 8px;

            margin-top: 12px;

        }


        .synora-qty {

            width: 28px;
            height: 28px;

            border:
                1px solid var(--border);

            border-radius: 50%;

            background: transparent;

            color: var(--text);

            cursor: pointer;

        }


        .synora-remove {

            margin-left: auto;

            border: 0;

            background: transparent;

            color: var(--muted);

            cursor: pointer;

            font-size: 10px;

        }


        .synora-cart-footer {

            padding: 25px;

            border-top:
                1px solid var(--border);

        }


        .synora-total {

            display: flex;

            justify-content:
                space-between;

            margin-bottom: 18px;

            font-size: 18px;

        }


        .synora-checkout {

            width: 100%;

            padding: 16px;

            border: 0;

            border-radius: 40px;

            background: var(--text);

            color: var(--bg);

            font-weight: 800;

            cursor: pointer;

        }


        .synora-empty {

            text-align: center;

            padding: 80px 20px;

            color: var(--muted);

        }


        @media (max-width: 500px) {

            .synora-cart-panel {

                width: 100%;

                max-width: 100%;

            }

        }

    `;


    document.head.appendChild(style);

}


/* =========================================================
   12. RENDER CART
========================================================= */

function renderCart() {

    const container =
        document.querySelector(
            ".synora-cart-products"
        );


    const totalElement =
        document.querySelector(
            ".synora-total strong"
        );


    if (!container) {
        return;
    }


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="synora-empty">

                <div style="font-size:45px;">
                    🛍
                </div>

                <h3>
                    Your Cart Is Empty
                </h3>

                <p>
                    Add something beautiful
                    from SYNORA.
                </p>

            </div>

        `;


        if (totalElement) {
            totalElement.innerHTML =
                "Rs. 0";
        }

        return;
    }


    let total = 0;


    container.innerHTML = "";


    cart.forEach(function (item, index) {

        const quantity =
            Number(item.quantity) || 1;

        const price =
            Number(item.price) || 0;


        total +=
            price * quantity;


        const itemBox =
            document.createElement("div");


        itemBox.className =
            "synora-cart-item";


        itemBox.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div>

                <h4>
                    ${item.name}
                </h4>

                <div class="synora-cart-brand">
                    ${item.brand}
                </div>

                <div class="synora-cart-price">
                    Rs. ${price.toLocaleString()}
                </div>


                <div
                    class="synora-cart-controls">

                    <button
                        class="synora-qty"
                        data-index="${index}"
                        data-action="minus">
                        −
                    </button>

                    <strong>
                        ${quantity}
                    </strong>

                    <button
                        class="synora-qty"
                        data-index="${index}"
                        data-action="plus">
                        +
                    </button>

                    <button
                        class="synora-remove"
                        data-index="${index}">
                        Remove
                    </button>

                </div>

            </div>

        `;


        container.appendChild(itemBox);

    });


    if (totalElement) {

        totalElement.innerHTML =
            "Rs. " + total.toLocaleString();

    }


    /* Quantity buttons */

    const quantityButtons =
        container.querySelectorAll(
            ".synora-qty"
        );


    quantityButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.getAttribute(
                                "data-index"
                            )
                        );


                    const action =
                        button.getAttribute(
                            "data-action"
                        );


                    if (action === "plus") {

                        cart[index].quantity++;

                    } else {

                        cart[index].quantity--;

                    }


                    if (
                        cart[index].quantity <= 0
                    ) {

                        cart.splice(index, 1);

                    }


                    saveCart();

                    updateCartCount();

                    renderCart();

                }
            );

        }
    );


    /* Remove buttons */

    const removeButtons =
        container.querySelectorAll(
            ".synora-remove"
        );


    removeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.getAttribute(
                                "data-index"
                            )
                        );


                    cart.splice(index, 1);


                    saveCart();

                    updateCartCount();

                    renderCart();

                }
            );

        }
    );

}


/* =========================================================
   13. CATEGORY FILTER
========================================================= */

const filterButtons =
    document.querySelectorAll(
        "[data-filter]"
    );


const productCards =
    document.querySelectorAll(
        ".product-card"
    );


filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const filter =
                    button.getAttribute(
                        "data-filter"
                    );


                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                productCards.forEach(
                    function (card) {

                        const category =
                            card.getAttribute(
                                "data-category"
                            );


                        if (
                            filter === "all" ||
                            category === filter
                        ) {

                            card.style.display =
                                "";

                        } else {

                            card.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    }
);


/* =========================================================
   14. FAQ
========================================================= */

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function () {

                item.classList.toggle(
                    "open"
                );

            }
        );

    }
);


/* =========================================================
   15. SCROLL ANIMATION
========================================================= */

const revealItems =
    document.querySelectorAll(
        ".reveal"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.1
            }
        );


    revealItems.forEach(
        function (item) {

            observer.observe(item);

        }
    );

} else {

    revealItems.forEach(
        function (item) {

            item.classList.add("show");

        }
    );

}


/* =========================================================
   16. LOADER
========================================================= */

const loader =
    document.querySelector(".loader");


if (loader) {

    window.addEventListener(
        "load",
        function () {

            setTimeout(
                function () {

                    loader.classList.add(
                        "hide"
                    );

                },
                1200
            );

        }
    );

}


/* =========================================================
   17. ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            const cartBox =
                document.querySelector(
                    ".synora-cart"
                );


            if (cartBox) {
                cartBox.remove();
            }


            if (navLinks) {

                navLinks.classList.remove(
                    "active"
                );

            }


            if (menuBtn) {

                menuBtn.innerHTML = "☰";

            }

        }

    }
);


/* =========================================================
   SYNORA READY
========================================================= */

console.log(
    "SYNORA website JavaScript loaded successfully."
);