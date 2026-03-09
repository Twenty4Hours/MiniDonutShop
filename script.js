// Smooth Scroll
document.getElementById('orderBtn').addEventListener('click', () => {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('floatingOrderBtn').addEventListener('click', () => {
    showPaymentModal();
});

// Hero Slideshow
const hero = document.querySelector('.hero');
const heroImages = [
    'donut1.jpg',
    'donut2.jpg',
    'donut3.jpg',
    'donut4.jpg',
    'donut5.jpg',
    'donut6.jpg'
];
let currentIndex = 0;
function changeHeroBg() {
    currentIndex = (currentIndex + 1) % heroImages.length;
    hero.style.backgroundImage = `url('${heroImages[currentIndex]}')`;
}
setInterval(changeHeroBg, 5000);
hero.style.backgroundImage = `url('${heroImages[0]}')`;

// Donuts Data
const donuts = [
    { name: "Strawberry Delight", desc: "Sweet strawberry glaze with sprinkles.", img: "donut1.jpg", cat: "classic", price: 2.50 },
    { name: "Chocolate Heaven", desc: "Rich chocolate frosting topped with cocoa nibs.", img: "donut2.jpg", cat: "classic", price: 3.00 },
    { name: "Classic Glaze", desc: "Soft and fluffy donuts with a sugary glaze.", img: "donut3.jpg", cat: "classic", price: 2.00 },
    { name: "Maple Bacon", desc: "Sweet maple glaze with crispy bacon bits.", img: "donut4.jpg", cat: "specialty", price: 3.50 },
    { name: "Blueberry Dream", desc: "Blueberry glaze topped with white chocolate drizzle.", img: "donut5.jpg", cat: "specialty", price: 3.25 },
    { name: "Lemon Zest", desc: "Refreshing lemon glaze with sugar sprinkle.", img: "donut6.jpg", cat: "seasonal", price: 2.75 }
];

const menuContainer = document.getElementById('menuItems');
let cart = 0;
const cartCount = document.getElementById('cartCount');
let cartItems = [];

// Render Menu with default quantity 0
function renderMenu(category = 'all') {
    menuContainer.innerHTML = '';
    donuts.filter(d => category === 'all' || d.cat === category).forEach(donut => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <img src="${donut.img}" alt="${donut.name}">
            <h3>${donut.name} - $${donut.price.toFixed(2)}</h3>
            <p>${donut.desc}</p>
            <div class="cart-controls">
                <button class="minus-btn">-</button>
                <span class="quantity">0</span>
                <button class="plus-btn">+</button>
                <button class="add-cart-btn" disabled>Add to Cart</button>
            </div>
        `;
        menuContainer.appendChild(div);

        const minusBtn = div.querySelector('.minus-btn');
        const plusBtn = div.querySelector('.plus-btn');
        const quantitySpan = div.querySelector('.quantity');
        const addBtn = div.querySelector('.add-cart-btn');

        function updateAddBtn() {
            addBtn.disabled = parseInt(quantitySpan.textContent) <= 0;
        }

        minusBtn.addEventListener('click', () => {
            let qty = parseInt(quantitySpan.textContent);
            if (qty > 0) quantitySpan.textContent = qty - 1;
            updateAddBtn();
        });

        plusBtn.addEventListener('click', () => {
            let qty = parseInt(quantitySpan.textContent);
            quantitySpan.textContent = qty + 1;
            updateAddBtn();
        });

        addBtn.addEventListener('click', () => {
            const qty = parseInt(quantitySpan.textContent);
            if (qty <= 0) return;

            cart += qty;
            cartCount.textContent = cart;

            const existing = cartItems.find(item => item.name === donut.name);
            if (existing) {
                existing.qty += qty;
            } else {
                cartItems.push({ name: donut.name, qty: qty, price: donut.price });
            }

            quantitySpan.textContent = 0;
            updateAddBtn();
            addBtn.textContent = "Added!";
            setTimeout(() => addBtn.textContent = "Add to Cart", 1000);
        });
    });
}
renderMenu();

// Category filter
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderMenu(btn.dataset.cat);
    });
});

// Payment Modal
const modal = document.getElementById('paymentModal');
const closeModal = document.querySelector('.modal .close');
const cartDetails = document.getElementById('cartDetails');
const totalPriceSpan = document.getElementById('totalPrice');
const payBtn = document.getElementById('payBtn');

function showPaymentModal() {
    modal.style.display = 'flex';
    renderCart();
}

function renderCart() {
    cartDetails.innerHTML = '';
    let total = 0;
    cartItems.forEach((item, index) => {
        const div = document.createElement('div');
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.marginBottom = "8px";

        const itemText = document.createElement('span');
        itemText.textContent = `${item.name} x ${item.qty} = $${(item.qty * item.price).toFixed(2)}`;
        div.appendChild(itemText);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.style.background = "#ff6347";
        removeBtn.style.color = "#fff";
        removeBtn.style.border = "none";
        removeBtn.style.borderRadius = "5px";
        removeBtn.style.cursor = "pointer";
        removeBtn.addEventListener('click', () => {
            cart -= item.qty;
            cartItems.splice(index, 1);
            cartCount.textContent = cart;
            renderCart();
        });
        div.appendChild(removeBtn);

        cartDetails.appendChild(div);
        total += item.qty * item.price;
    });
    totalPriceSpan.textContent = total.toFixed(2);
}

// Modal close
closeModal.onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target == modal) modal.style.display = 'none'; };

// Pay
payBtn.onclick = () => {
    if (cartItems.length === 0) { alert("Your cart is empty!"); return; }
    alert(`Thank you for your payment of $${totalPriceSpan.textContent}!`);
    cart = 0;
    cartItems = [];
    cartCount.textContent = 0;
    modal.style.display = 'none';
};

// Testimonials carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
function showTestimonial() {
    testimonials.forEach((t, i) => t.style.transform = `translateX(${100*(i-currentTestimonial)}%)`);
}
showTestimonial();
setInterval(() => { 
    currentTestimonial = (currentTestimonial + 1) % testimonials.length; 
    showTestimonial(); 
}, 5000);

// Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    this.reset();

});
