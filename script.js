document.addEventListener('DOMContentLoaded', () => {
    // 1. Target form elements
    const contactForm = document.querySelector('.contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = contactForm.querySelector('button[type="submit"]') || document.getElementById('submitBtn');

    // 2. Target popup modal elements
    const popupModal = document.getElementById('popupModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    // Helper function: Display popup with custom text
    function showPopup(title, message) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        if (popupModal) {
            popupModal.style.display = 'flex';
            popupModal.classList.add('active');
        }
    }

    // Helper function: Hide popup
    function hidePopup() {
        if (popupModal) {
            popupModal.style.display = 'none';
            popupModal.classList.remove('active');
        }
    }

    // Close modal when button is clicked
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', hidePopup);
    }

    // Close modal when clicking outside box
    window.addEventListener('click', (event) => {
        if (event.target === popupModal) {
            hidePopup();
        }
    });

    // 3. Handle Form Submit
    contactForm.addEventListener('submit', async (e) => {
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

        // Construct payload matching your backend expectations
        const payload = {
            name: nameValue,
            email_id: emailValue, // Mapped to email_id based on your backend spec
            message: messageValue
        };

        // Optional: Change button text to show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        try {
            // Send data to your Railway backend API
            const response = await fetch('https://resturentbackend-production.up.railway.app/api/messages/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                // Success Case
                showPopup('Reservation Request Received!', `Thank you, ${nameValue}. We have received your booking details and will contact you shortly.`);
                contactForm.reset();
            } else {
                const errorData = await response.json().catch(() => ({}));
                showPopup('Submission Failed', errorData.message || `Server returned error status ${response.status}`);
            }
        } catch (error) {
            console.error('API Error:', error);
            showPopup('Connection Error', 'Unable to reach the server. Please check your internet connection or backend CORS settings.');
        } finally {
            // Restore button state
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Book A Table';
            }
        }
    });
});
