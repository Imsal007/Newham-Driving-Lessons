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

    // Modal functionality for booking
    const bookButtons = document.querySelectorAll('.btn-book, .cta-button');
    const modal = document.getElementById('bookingModal');
    const modalClose = document.querySelector('.modal-close');
    const modalPackageSelect = document.getElementById('packageSelect');
    const modalTestCentreSelect = document.getElementById('testCentreSelect');
    const modalBookBtn = document.getElementById('modalBookBtn');

    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks2 = document.querySelectorAll('nav ul li a');
    navLinks2.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // Open modal with package pre-selected
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

    // Close modal
    if (modalClose && modal) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Handle modal booking button
    if (modalBookBtn) {
        modalBookBtn.addEventListener('click', function() {
            const selectedPackage = modalPackageSelect ? modalPackageSelect.value : 'Lesson Inquiry';
            const selectedCentre = modalTestCentreSelect ? modalTestCentreSelect.value : 'Newham Area';
            openWhatsApp(selectedPackage, selectedCentre);
        });
    }
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
