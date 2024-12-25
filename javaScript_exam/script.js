let products = JSON.parse(localStorage.getItem('products')) || [];

function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function addProduct() {
    const title = document.getElementById('product-title').value;
    const price = document.getElementById('product-price').value;
    const image = document.getElementById('product-image').value;
    const category = document.getElementById('product-category').value;

    if (!title || !price) {
        alert('Title and price are required!');
        return;
    }

    const product = {
        id: Date.now(),
        title,
        price: parseFloat(price),
        image,
        category
    };

    products.push(product);
    saveToLocalStorage();
    displayProducts(products);

    document.getElementById('product-title').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-image').value = '';
}

function displayProducts(productList) {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = '';

    productList.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <h3>${product.title}</h3>
            <p>Price: ₹${product.price.toFixed(2)}</p>
            <img src="${product.image}" alt="${product.title}">
            <p>Category: ${product.category}</p>
            <button onclick="editProduct(${product.id})" id="edit">Edit</button>
            <button onclick="deleteProduct(${product.id})" id="del">Delete</button>
        `;
        productContainer.appendChild(productItem);
    });
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const newTitle = prompt('Edit Title:', product.title);
    const newPrice = prompt('Edit Price:', product.price);
    const newImage = prompt('Edit Image URL:', product.image);
    const newCategory = prompt('Edit Category:', product.category);

    if (newTitle) product.title = newTitle;
    if (newPrice) product.price = parseFloat(newPrice);
    if (newImage) product.image = newImage;
    if (newCategory) product.category = newCategory;

    saveToLocalStorage();
    displayProducts(products);
}

function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    saveToLocalStorage();
    displayProducts(products);
}

function sortProducts(order) {
    products.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
    displayProducts(products);
}

function searchProduct() {
    const searchValue = document.getElementById('search-title').value.toLowerCase();
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchValue));
    displayProducts(filteredProducts);
}

function filterProducts() {
    const category = document.getElementById('filter-category').value;
    const filteredProducts = category ? products.filter(product => product.category === category) : products;
    displayProducts(filteredProducts);
}

window.onload = () => displayProducts(products);