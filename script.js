const cors = require('cors');
app.use(cors());
document.addEventListener('DOMContentLoaded', () => {
    // 1. Target form elements
    const contactForm = document.querySelector('.contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    // 2. Target popup modal elements
    const popupModal = document.getElementById('popupModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    // Helper function: Display popup with custom text
    function showPopup(title, message) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        popupModal.style.display = 'flex';
    }
    // Helper function: Hide popup
    function hidePopup() {
        popupModal.style.display = 'none';
    }
    // Close modal when button is clicked
    modalCloseBtn.addEventListener('click', hidePopup);
    // Close modal when clicking outside box
    window.addEventListener('click', (event) => {
        if (event.target === popupModal) {
            hidePopup();
        }
    });
    // 3. Handle Form Submit
    contactForm.addEventListener('submit', (e) => {
        // Prevent default browser refresh
        e.preventDefault();
        // Retrieve field values
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();
        // Check 1: Empty Fields
        if (nameValue === '' || emailValue === '' || messageValue === '') {
            showPopup('Required Fields Missing', 'Please fill in all fields before submitting your reservation.');
            return;
        }
        // Check 2: Basic Email Format
        if (!emailValue.includes('@') || !emailValue.includes('.')) {
            showPopup('Invalid Email Address', 'Please enter a valid email address so we can confirm your booking.');
            return;
        }
        // Success Case
        showPopup('Reservation Request Received!', `Thank you, ${nameValue}. We have received your booking details and will contact you shortly.`);
        // Reset form inputs
        contactForm.reset();
    });
})
