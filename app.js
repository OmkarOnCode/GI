// List of GI products based on states/regions with images, prices, and descriptions
const giProducts = {
    "Karnataka": [
        { 
            name: "Mysore Silk", 
            image: "images/mysore-silk.jpg", 
            price: 5000, 
            description: "Mysore Silk is known for its smooth texture, natural sheen, and vibrant colors. Woven from pure mulberry silk, it is adorned with intricate zari work, making it one of the finest silk fabrics in India."
        },
        { 
            name: "Coorg Coffee", 
            image: "images/coorg-coffee.jpg", 
            price: 300, 
            description: "Grown in the misty hills of Coorg, Karnataka, this coffee is medium-bodied with a unique flavor that reflects the region’s rich soil and climate."
        },
        { 
            name: "Dharwad Pedha", 
            image: "images/dharwad-pedha.jpg", 
            price: 200, 
            description: "A traditional sweet from Dharwad, Karnataka, made from milk and sugar with a granular texture and a mildly sweet flavor."
        }
    ],
    "Tamil Nadu": [
        { 
            name: "Kanchipuram Silk", 
            image: "images/kanchipuram-silk.jpg", 
            price: 6000, 
            description: "Kanchipuram Silk is renowned for its durability and beauty. The sarees are often adorned with rich gold zari work and are a symbol of elegance and luxury in Tamil Nadu."
        },
        { 
            name: "Madurai Jasmine", 
            image: "images/madurai-jasmine.jpg", 
            price: 150, 
            description: "Known for its strong fragrance and bright white petals, Madurai Jasmine is used in traditional garlands for weddings and religious ceremonies."
        }
    ],
    "West Bengal": [
        { 
            name: "Darjeeling Tea", 
            image: "images/darjeeling-tea.jpg", 
            price: 400, 
            description: "Darjeeling Tea is known for its floral and fruity aroma with a muscatel flavor. Grown in the high-altitude tea gardens of West Bengal, it is often referred to as the 'Champagne of Teas'."
        },
        { 
            name: "Bengal Muslin", 
            image: "images/bengal-muslin.jpg", 
            price: 7000, 
            description: "Bengal Muslin is a fine cotton fabric, once sought after by royalty and nobility for its delicate, sheer quality and intricate handwoven patterns."
        }
    ],
    "Maharashtra": [
        { 
            name: "Kolhapuri Chappal", 
            image: "images/kolhapuri-chappal.jpg", 
            price: 1000, 
            description: "Handcrafted from natural leather, Kolhapuri Chappals are durable and stylish. Each pair is unique due to the traditional, intricate crafting methods passed down through generations."
        },
        { 
            name: "Paithani Saree", 
            image: "images/paithani-saree.jpg", 
            price: 8000, 
            description: "The Paithani Saree is a luxurious handwoven silk saree with intricate gold zari borders and peacock motifs. It is a symbol of Maharashtra’s rich textile heritage."
        }
    ]
};

// Function to get the user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('location-status').innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Function to handle successful location retrieval
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let region;

    // Check for Karnataka
    if (latitude >= 12.0 && latitude <= 18.5 && longitude >= 74.0 && longitude <= 78.5) {
        region = "Karnataka";
    } 
    // Check for Tamil Nadu
    else if (latitude >= 8.5 && latitude <= 13.5 && longitude >= 77.0 && longitude <= 80.5) {
        region = "Tamil Nadu";
    } 
    // Check for West Bengal
    else if (latitude >= 22.0 && latitude <= 27.5 && longitude >= 86.0 && longitude <= 89.5) {
        region = "West Bengal";
    } 
    // Check for Maharashtra
    else if (latitude >= 18.0 && latitude <= 22.0 && longitude >= 72.5 && longitude <= 80.0) {
        region = "Maharashtra";
    } 
    // Default to Karnataka if location is unclear
    else {
        region = "Karnataka"; 
    }

    document.getElementById('location-status').innerHTML = `Your location is detected as: ${region}`;
    displayProducts(region);
}


// Function to display GI products for the matched region
function displayProducts(region) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const products = giProducts[region];
    if (products) {
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            const productLink = document.createElement('a');
            productLink.href = `product.html?name=${encodeURIComponent(product.name)}`;

            const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.name;

            const productName = document.createElement('h3');
            productName.textContent = product.name;

            const productPrice = document.createElement('p');
            productPrice.textContent = `Price: ₹${product.price}`;

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;

            productLink.appendChild(productImage);
            productItem.appendChild(productLink);
            productItem.appendChild(productName);
            productItem.appendChild(productPrice);
            productItem.appendChild(productDescription);
            productList.appendChild(productItem);
        });
    } else {
        productList.innerHTML = `<div>No GI products found for your region.</div>`;
    }
}

// Function to handle errors in geolocation
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('location-status').innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('location-status').innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('location-status').innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('location-status').innerHTML = "An unknown error occurred.";
            break;
    }
}

// Function to retrieve the query parameter from URL
function getProductFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('name');
}

// Function to display the product details on product.html
function displayProductDetails() {
    const productName = getProductFromURL();
    let product;

    // Find the product in the giProducts list
    for (const region in giProducts) {
        product = giProducts[region].find(p => p.name === productName);
        if (product) break;
    }

    if (product) {
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-price').textContent = `Price: ₹${product.price}`;
        document.getElementById('product-description').textContent = product.description;

        // Handle add to cart action
        document.getElementById('add-to-cart').addEventListener('click', () => {
            addToCart(product);
            alert(`${product.name} added to cart!`);
        });
    }
}

// Function to add product to the cart using localStorage
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to display cart items from localStorage
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');

    cartList.innerHTML = '';
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ₹${item.price}`;
        cartList.appendChild(listItem);
    });
}

// Proceed to payment when checkout button is clicked
if (window.location.pathname.includes('cart.html')) {
    displayCart();
    document.getElementById('checkout').addEventListener('click', () => {
        window.location.href = 'payment.html';
    });
}

// Trigger location fetching on page load (for index.html)
if (window.location.pathname.includes('index.html')) {
    getLocation();
}

// Trigger product display on product.html load
if (window.location.pathname.includes('product.html')) {
    displayProductDetails();
}

// Handle form submission for payment (payment.html)
if (window.location.pathname.includes('payment.html')) {
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Payment Successful!');
        localStorage.removeItem('cart'); // Clear cart after successful payment
        window.location.href = 'index.html'; // Redirect to homepage after payment
    });
}
// Function to display cart items from localStorage
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');

    cartList.innerHTML = '';
    
    // Group products by name and calculate total quantities
    const groupedProducts = {};
    cart.forEach(item => {
        if (!groupedProducts[item.name]) {
            groupedProducts[item.name] = { ...item, quantity: 0 };
        }
        groupedProducts[item.name].quantity += 1;
    });

    for (const productName in groupedProducts) {
        const product = groupedProducts[productName];
        const productContainer = document.createElement('div');
        productContainer.classList.add('cart-item');

        // Create image element for product
        const productImage = document.createElement('img');
        productImage.src = product.image; // Set the source to the product image
        productImage.alt = product.name; // Alt text for accessibility
        productImage.style.width = '50px'; // Set a width for the image
        productImage.style.height = 'auto'; // Keep aspect ratio

        // Create quantity input
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = product.quantity;
        quantityInput.min = 1; // Minimum quantity
        quantityInput.classList.add('quantity-input');

        // Create price display
        const priceDisplay = document.createElement('span');
        priceDisplay.textContent = `₹${product.price * product.quantity}`;

        // Assemble the cart item
        productContainer.appendChild(productImage);
        productContainer.appendChild(document.createTextNode(`${product.name} `));
        productContainer.appendChild(quantityInput);
        productContainer.appendChild(priceDisplay);
        cartList.appendChild(productContainer);
    }
}
