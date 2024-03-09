const bar = document.getElementById("bar");
const nav = document.getElementById('navbar');
const close = document.getElementById('close');
const searchInput = document.getElementById('search-input');

if (bar) {
    bar.addEventListener('click', () => {
        toggleNavbar();
    });
}

if (close) {
    close.addEventListener('click', () => {
        toggleNavbar();
    });
}

searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
});

function toggleNavbar() {
    nav.classList.toggle('active');
}

function searchProducts() {
    const searchQuery = searchInput.value.trim().toLowerCase();
    const products = document.querySelectorAll('.pro');

    products.forEach(product => {
        const productName = product.querySelector('.des h5', '.des span').innerText.toLowerCase();
        const productBrand = product.querySelector('.des span').innerText.toLowerCase();
        const combinedText = productName + ' ' + productBrand;
        const displayStyle = combinedText.includes(searchQuery) ? 'block' : 'none';
        product.style.display = displayStyle;
    });
}
function openModal(productName, productBrand, productPrice, productDescription, addToCartHTML) {
    var productDetails = document.getElementById('productDetails');
    productDetails.innerHTML = `
        <h2>${productName}</h2>
        <p>Brand: ${productBrand}</p>
        <p>Price: $${productPrice}</p>
        <p>Description: ${productDescription}</p>
        <p>Add To Cart: <span class="addToCartBtn" onclick="addToCart('${productName}', '${productBrand}', ${productPrice}, '${productDescription}')">${addToCartHTML}</span></p>
    `;

    var modal = document.getElementById('productModal');
    modal.style.display = 'block';
  }

  function closeModal() {
    var modal = document.getElementById('productModal');
    modal.style.display = 'none';
    modal.style.transition = '0.3s ease-out';

  }

  function addToCart(productName, productBrand, productPrice, productDescription) {
   
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

   
    const newProduct = {
      productName,
      productBrand,
      productPrice,
      productDescription,
    };

    cartItems.push(newProduct);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // alert(`${productName} added to the cart!`); Optional
    if ('Notification' in window) {
        // Request permission to show notifications
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                // Show a notification
                new Notification(`${productName} added to the cart!`);
                closeModal();
                
            }
        });
    }
    
  }
  
  function redirectToShop(productName, productBrand, productPrice, productDescription, addToCartHTML) {

    openModal(productName, productBrand, productPrice, productDescription, addToCartHTML);
  }
 