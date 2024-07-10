document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Reset previous error messages
        removeErrorMessages();

        let isValid = true;

        // Validate email
        if (emailInput.value.trim() === '') {
            displayError(emailInput, 'Email address is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            displayError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate password
        if (passwordInput.value.trim() === '') {
            displayError(passwordInput, 'Password is required');
            isValid = false;
        }

        if (isValid) {
            // If the form is valid, you can submit it
            form.submit();
        }
    });

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function displayError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-500 text-xs mt-1';
        errorDiv.textContent = message;
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
        input.classList.add('border-red-500');
    }

    function removeErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => input.classList.remove('border-red-500'));
    }
});