document.addEventListener('DOMContentLoaded', () => {
    const iconContainers = document.querySelectorAll('.icon-container');
    const form = document.getElementById('registrationForm');
    const googleSignInBtn = document.querySelector('.google-sign-in');
    let selectedRole = null;

    // Prevent double-tap zoom on mobile
    document.addEventListener('touchend', (e) => {
        e.preventDefault();
        const target = e.target;
        if (target.classList.contains('role-icon') || 
            target.classList.contains('checkbox-box') || 
            target.classList.contains('submit-btn')) {
            target.click();
        }
    }, { passive: false });

    // Role selection handling
    iconContainers.forEach(container => {
        container.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove selected class from all containers
            iconContainers.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked container
            container.classList.add('selected');
            selectedRole = container.dataset.role;

            // Add haptic feedback for mobile devices if available
            if (window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(50);
            }
        });
    });

    // Google Sign In handling
    googleSignInBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (!selectedRole) {
            alert('Please select a role (Student, Teacher, or Parent) first');
            return;
        }

        // Add haptic feedback
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }

        // Here you would typically integrate with Google OAuth
        console.log('Google Sign In clicked for role:', selectedRole);
    });

    // Form submission handling
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const consent = document.getElementById('consent').checked;

        // Basic validation
        if (!selectedRole) {
            alert('Please select a role (Student, Teacher, or Parent)');
            return;
        }

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Basic password validation (at least 8 characters)
        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        if (!consent) {
            alert('Please agree to data processing');
            return;
        }

        // If all validation passes, create registration data
        const registrationData = {
            role: selectedRole,
            email: email,
            password: password,
            consent: consent
        };

        // Add haptic feedback for form submission
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate([100, 50, 100]);
        }

        // Log the registration data (in a real application, this would be sent to a server)
        console.log('Registration Data:', registrationData);
        
        // Clear form
        form.reset();
        iconContainers.forEach(c => c.classList.remove('selected'));
        selectedRole = null;
    });

    // Prevent zoom on input focus for iOS
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('focus', (e) => {
            e.target.setAttribute('readonly', 'readonly');
            setTimeout(() => {
                e.target.removeAttribute('readonly');
                e.target.focus();
            }, 100);
        });
    });
});
