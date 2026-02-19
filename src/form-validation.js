document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '');
    });
});

document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !isValidEmail(input.value)) {
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });

    input.addEventListener('input', () => {
        if (input.style.borderColor === 'red') {
            if (!input.value || isValidEmail(input.value)) {
                input.style.borderColor = '';
            }
        }
    });
});

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value && !isValidEmail(emailInput.value)) {
            e.preventDefault();
            emailInput.style.borderColor = 'red';
            emailInput.focus();
        }
    });
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
