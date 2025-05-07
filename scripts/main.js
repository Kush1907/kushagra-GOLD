document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Price Toggle
    const priceBtns = document.querySelectorAll('.price-btn');
    const currentPriceDisplay = document.querySelector('.current-price');
    const currentMetal = document.getElementById('current-metal');
    const currentPrice = document.getElementById('current-price');
    
    priceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            priceBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current price display
            const metal = this.dataset.metal;
            if (metal === 'gold') {
                currentMetal.textContent = 'Gold';
                currentPrice.textContent = '5,850';
            } else {
                currentMetal.textContent = 'Silver';
                currentPrice.textContent = '75';
            }
        });
    });
    
    // Product Data
    const products = [
        {
            id: 'G001',
            title: 'Classic Gold Necklace',
            description: 'Elegant 22K gold necklace with traditional design, perfect for weddings and special occasions.',
            price: '₹45,600',
            image: 'images/product1.jpg'
        },
        {
            id: 'G002',
            title: 'Diamond Stud Earrings',
            description: 'Exquisite 18K gold earrings with premium quality diamonds, certified purity.',
            price: '₹32,800',
            image: 'images/product2.jpg'
        },
        {
            id: 'G003',
            title: 'Gold Bangles Set',
            description: 'Set of four 22K gold bangles with intricate designs, available in different weights.',
            price: '₹68,900',
            image: 'images/product3.jpg'
        },
        {
            id: 'G004',
            title: 'Temple Jewelry Set',
            description: 'Traditional South Indian style temple jewelry set in 22K gold with ruby stones.',
            price: '₹1,25,000',
            image: 'images/product4.jpg'
        },
        {
            id: 'G005',
            title: 'Gold Chain for Men',
            description: 'Premium 22K gold chain for men with durable clasp, available in multiple lengths.',
            price: '₹38,500',
            image: 'images/product5.jpg'
        },
        {
            id: 'S001',
            title: 'Silver Tea Set',
            description: 'Elegant sterling silver tea set with tray, perfect for gifting and home decor.',
            price: '₹12,500',
            image: 'images/product6.jpg'
        },
        {
            id: 'S002',
            title: 'Silver Pooja Items',
            description: 'Set of traditional silver pooja items including lamps, bowls and spoons.',
            price: '₹8,900',
            image: 'images/product7.jpg'
        },
        {
            id: 'S003',
            title: 'Silver Cuff Bracelet',
            description: 'Modern sterling silver cuff bracelet with contemporary design.',
            price: '₹2,400',
            image: 'images/product8.jpg'
        },
        {
            id: 'S004',
            title: 'Silver Coin Collection',
            description: 'Collector\'s set of pure silver coins with historical designs, certificate included.',
            price: '₹15,000',
            image: 'images/product9.jpg'
        }
    ];
    
    // Render Products
    const productsGrid = document.querySelector('.products-grid');
    
    function renderProducts(metalFilter = 'all') {
        productsGrid.innerHTML = '';
        
        const filteredProducts = metalFilter === 'all' ? 
            products : 
            products.filter(product => product.id.startsWith(metalFilter === 'gold' ? 'G' : 'S'));
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <p class="product-code">Product Code: ${product.id}</p>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">${product.price}</p>
                    <div class="product-actions">
                        <a href="#contact" class="btn-primary">Enquire Now</a>
                        <a href="https://wa.me/919876543210?text=I'm interested in ${product.title} (Code: ${product.id})" 
                           class="btn-primary whatsapp" target="_blank">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </a>
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
    }
    
    // Initial render
    renderProducts('gold');
    
    // Filter products when price buttons are clicked
    priceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const metal = this.dataset.metal;
            renderProducts(metal);
        });
    });
    
    // Update current date and time for price updates
    function updatePriceTimestamps() {
        const now = new Date();
        const options = { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        const formattedDate = now.toLocaleDateString('en-IN', options);
        
        document.getElementById('gold-update').textContent = formattedDate;
        document.getElementById('silver-update').textContent = formattedDate;
    }
    
    updatePriceTimestamps();
    
    // Update prices every hour (simulated)
    setInterval(updatePriceTimestamps, 3600000);
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});
// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});