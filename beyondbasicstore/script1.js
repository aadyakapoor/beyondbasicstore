
const products = {
    men: [
    { name: "Men's T-Shirt", price: 499, image: "./image.png" },
    { name: "Men's polo shirt", price: 999, image: "./custom-mens-apparel.jpg" },
    { name: "Men's T-Shirt", price: 499, image: "./tshirtformen.jpeg" },
    { name: "Men's striped shirt", price: 999, image: "./MW37542_0A5_FNT.jpeg" },
    { name: "Men's flannel", price: 499, image: "./The-Indian-Garage-Co-100-SDL603721324-1-fb1b5.avif" },
    { name: "Men's full sleeve", price: 999, image: "./apparelmen.jpeg" },
    { name: "Men's T-Shirt", price: 499, image: "./menshirt.jpeg" },
    { name: "Men's hoodie", price: 999, image: "./menhoodie.jpeg" },
    ],
    women: [
    { name: "Kurti", price: 799, image: "./image2.png" },
    { name: "White Kurti", price: 799, image: "./womenapp.jpeg" },
    { name: "Women's Dress", price: 799, image: "./womenapp2.jpeg" },
    { name: "Women's Jacket", price: 799, image: "./womenapp3.jpeg" },
    { name: "White Tshirt", price: 799, image: "./womenapp4.jpeg" },
    { name: "Levis Black tee", price: 799, image: "./womenapp5.jpeg" },
    { name: "Cartoon print tee", price: 799, image: "./womenapp6.jpeg" },
    { name: "Mickey mouse tee", price: 799, image: "./womenapp7.jpeg" },
    ],
    kids: [
        { name: "Co-ord set", price: 699, image: "./kids7.webp" },
        { name: "Co-ord Set", price: 699, image: "./kids1.jpg" },
        { name: "Co-ord Set", price: 699, image: "./kids2.webp" },
        { name: "Co-ord Set", price: 699, image: "./kids3.webp" },
        { name: "Co-ord Set", price: 699, image: "./kids4.webp" },
        { name: "Co-ord Set", price: 699, image: "./kids5.jpeg" },
        { name: "Co-ord Set", price: 699, image: "./kids6.jpg" },
        { name: "Co-ord Set", price: 699, image: "./kids8.webp" },
    ],
};


let cart = [];


function updateBanner(category) {
    const bannerImages = {
        men: "./banner1.png",
        women: "./banner2.png",
        kids: "./banner3.png",
    };
    document.getElementById("banner-image").src = bannerImages[category];
}


function showProducts(tabName) {
    document.getElementById("cart").style.display = "none"; 
    const productContainer = document.getElementById("products");
    productContainer.innerHTML = ""; 

    updateBanner(tabName); 

    products[tabName].forEach((product, index) => {
        productContainer.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image" />
                <h3>${product.name}</h3>
                <p>Rs.${product.price}</p>
                <button onclick="addToCart('${tabName}', ${index})">Add to Cart</button>
            </div>
        `;
    });
}


function addToCart(tabName, index) {
    const product = products[tabName][index];
    const item = cart.find((item) => item.name === product.name);

    if (item) {
        item.quantity++; 
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            quantity: 1,
        }); 
    }

    updateCart();
}


function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCart();
  }
  
 
  function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1); 
    }
    updateCart();
  }


function showCart() {
    const cartContainer = document.getElementById("cart");
    cartContainer.style.display = "block"; 
    document.getElementById("products").innerHTML = ""; 
    updateCart();
}


function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";
    let totalCount = 0;

    cart.forEach((item, index) => {
        totalCount += item.quantity;
        cartItems.innerHTML += `
            <li>
                ${item.name} - Rs.${item.price} x ${item.quantity}
                <button onclick="decreaseQuantity(${index})">-</button>
                <button onclick="increaseQuantity(${index})">+</button>
            </li>
        `;
    });

    cartCount.innerText = totalCount; 
    if (cart.length > 0) {
        cartItems.innerHTML += `<br><button onclick="buyNow()">Buy Now</button>`;
    }
}
function buyNow() {
    alert("Order Placed");
    cart = [];
    updateCart();
}


window.onload = () => showProducts("men");


