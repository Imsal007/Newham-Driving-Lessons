// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navUl = document.querySelector('nav ul');

    if (mobileMenuBtn && navUl) {
        mobileMenuBtn.addEventListener('click', function() {
            navUl.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navUl.classList.remove('active');
        });
    });

    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks2 = document.querySelectorAll('nav ul li a');
    navLinks2.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // ===================================
    // WHATSAPP MODAL FUNCTIONALITY
    // ===================================
    
    // Floating WhatsApp button triggers modal
    const floatingWhatsappBtn = document.querySelector('.floating-whatsapp-btn');
    const whatsappModal = document.getElementById('whatsapp-modal');
    const modalClose = whatsappModal ? whatsappModal.querySelector('.modal-close') : null;
    const whatsappForm = document.getElementById('whatsapp-form');
    
    // Open WhatsApp modal
    if (floatingWhatsappBtn && whatsappModal) {
        floatingWhatsappBtn.addEventListener('click', function() {
            whatsappModal.classList.add('active');
        });
    }
    
    // Close WhatsApp modal
    if (modalClose && whatsappModal) {
        modalClose.addEventListener('click', function() {
            whatsappModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    if (whatsappModal) {
        whatsappModal.addEventListener('click', function(e) {
            if (e.target === whatsappModal) {
                whatsappModal.classList.remove('active');
            }
        });
    }
    
    // Handle WhatsApp form submission
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('wa-name').value.trim();
            const area = document.getElementById('wa-area').value;
            const pkg = document.getElementById('wa-package').value;
            
            if (!name || !area || !pkg) {
                alert('Please fill in all fields');
                return;
            }
            
            // Generate WhatsApp message
            const phoneNumber = '447983546733';
            const message = `Hi, my name is ${name}. I want to book the ${pkg} in ${area}.`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Close modal
            whatsappModal.classList.remove('active');
            
            // Reset form
            whatsappForm.reset();
        });
    }

    // Legacy modal functionality for booking buttons
    const bookButtons = document.querySelectorAll('.btn-book, .cta-button');
    const modal = document.getElementById('bookingModal');
    const modalPackageSelect = document.getElementById('packageSelect');
    const modalTestCentreSelect = document.getElementById('testCentreSelect');
    const modalBookBtn = document.getElementById('modalBookBtn');

    // Open modal with package pre-selected
    if (bookButtons.length > 0 && modal) {
        bookButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const packageValue = this.getAttribute('data-package') || 'Standard Lesson';
                if (modal && modalPackageSelect) {
                    modalPackageSelect.value = packageValue;
                    modal.classList.add('active');
                } else {
                    // Fallback: direct WhatsApp link
                    openWhatsApp(packageValue, 'Newham');
                }
            });
        });
    }

    // Close legacy modal
    if (modal && modalClose) {
        const legacyClose = modal.querySelector('.modal-close');
        if (legacyClose) {
            legacyClose.addEventListener('click', function() {
                modal.classList.remove('active');
            });
        }
    }

    // Close legacy modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Handle legacy modal booking button
    if (modalBookBtn) {
        modalBookBtn.addEventListener('click', function() {
            const selectedPackage = modalPackageSelect ? modalPackageSelect.value : 'Lesson Inquiry';
            const selectedCentre = modalTestCentreSelect ? modalTestCentreSelect.value : 'Newham Area';
            openWhatsApp(selectedPackage, selectedCentre);
        });
    }
    
    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => observer.observe(el));
});

// Function to open WhatsApp with pre-filled message
function openWhatsApp(pkg, centre) {
    const phoneNumber = '447983546733';
    const message = `Hi, I want to book the ${pkg} in ${centre}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Form submission handler (if needed)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}
