document.addEventListener('DOMContentLoaded', function() {
    const enquiryForm = document.getElementById('enquiryForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(enquiryForm);
            
            // You can use Formspree or your own backend here
            // This is a simulation of form submission
            fetch(enquiryForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    enquiryForm.style.display = 'none';
                    formSuccess.style.display = 'flex';
                    
                    // Reset form
                    enquiryForm.reset();
                    
                    // Scroll to success message
                    formSuccess.scrollIntoView({ behavior: 'smooth' });
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                alert('There was a problem submitting your form. Please try again later or contact us directly.');
                console.error('Error:', error);
            });
        });
    }
    
    // Auto-fill product enquiry if coming from product link
    const urlParams = new URLSearchParams(window.location.search);
    const productCode = urlParams.get('product');
    
    if (productCode) {
        const product = products.find(p => p.id === productCode);
        if (product) {
            const interestSelect = document.querySelector('select[name="interest"]');
            const messageTextarea = document.querySelector('textarea[name="message"]');
            
            if (interestSelect) {
                interestSelect.value = product.id.startsWith('G') ? 'gold-jewelry' : 'silver-jewelry';
            }
            
                     if (messageTextarea) {
                messageTextarea.value = `I'm interested in ${product.title} (Product Code: ${product.id}). Please provide more details.`;
            }
            
            // Scroll to form
            setTimeout(() => {
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }
});

// Simulated price update function
function simulatePriceUpdates() {
    // Gold prices typically fluctuate between 1-2% daily
    const goldPriceElement = document.getElementById('current-price');
    const goldItems = document.querySelectorAll('.gold .price-item span:last-child');
    const silverItems = document.querySelectorAll('.silver .price-item span:last-child');
    
    // Get current prices
    let currentGoldPrice = 5850;
    let current22KPrice = 5450;
    let current18KPrice = 4380;
    let currentSilverPrice = 75;
    let currentPureSilverPrice = 82;
    
    // Update prices every 5 minutes (simulated market changes)
    setInterval(() => {
        // Generate small random fluctuations
        const goldChange = (Math.random() * 20 - 10); // -10 to +10
        const silverChange = (Math.random() * 2 - 1); // -1 to +1
        
        // Update prices
        currentGoldPrice = Math.max(5800, Math.min(5900, currentGoldPrice + goldChange));
        current22KPrice = Math.max(5400, Math.min(5500, current22KPrice + goldChange * 0.92));
        current18KPrice = Math.max(4300, Math.min(4450, current18KPrice + goldChange * 0.75));
        currentSilverPrice = Math.max(72, Math.min(78, currentSilverPrice + silverChange));
        currentPureSilverPrice = Math.max(80, Math.min(85, currentPureSilverPrice + silverChange * 1.1));
        
        // Update displayed prices
        if (document.getElementById('current-metal').textContent === 'Gold') {
            goldPriceElement.textContent = currentGoldPrice.toFixed(0);
        }
        
        // Update all gold price displays
        goldItems[0].textContent = `₹${currentGoldPrice.toFixed(0)}/gm`;
        goldItems[1].textContent = `₹${current22KPrice.toFixed(0)}/gm`;
        goldItems[2].textContent = `₹${current18KPrice.toFixed(0)}/gm`;
        
        // Update all silver price displays
        silverItems[0].textContent = `₹${currentSilverPrice.toFixed(0)}/gm`;
        silverItems[1].textContent = `₹${currentPureSilverPrice.toFixed(0)}/gm`;
        
        // Update timestamp
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        document.querySelectorAll('.price-update span').forEach(span => {
            span.textContent = `Today, ${timeString}`;
        });
        
    }, 300000); // 5 minutes
}

// Initialize price simulation
simulatePriceUpdates();

// Product image lazy loading
function lazyLoadImages() {
    const productImages = document.querySelectorAll('.product-image img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '200px' });
    
    productImages.forEach(img => {
        if (!img.src) {
            img.dataset.src = img.getAttribute('data-src');
            imageObserver.observe(img);
        }
    });
}

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// WhatsApp click tracking
document.querySelectorAll('a[href*="whatsapp"]').forEach(link => {
    link.addEventListener('click', function() {
        // You can add analytics tracking here
        console.log('WhatsApp link clicked:', this.href);
    });
});

// Phone call tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        // You can add analytics tracking here
        console.log('Phone link clicked:', this.href);
    });
});
// In form-handler.js, update the form submission handler:
enquiryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'flex';
    
    // Get form data
    const formData = new FormData(enquiryForm);
    
    fetch(enquiryForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        loadingSpinner.style.display = 'none';
        if (response.ok) {
            enquiryForm.style.display = 'none';
            formSuccess.style.display = 'flex';
            enquiryForm.reset();
            formSuccess.scrollIntoView({ behavior: 'smooth' });
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        loadingSpinner.style.display = 'none';
        alert('There was a problem submitting your form. Please try again later or contact us directly.');
        console.error('Error:', error);
    });
});
