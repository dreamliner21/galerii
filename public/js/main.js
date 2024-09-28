// Simple form validation
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form[action="/login"]');
    const registerForm = document.querySelector('form[action="/register"]');
    const forgotPasswordForm = document.querySelector('form[action="/forgot-password"]');
  
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        if (!email || !password) {
          e.preventDefault();
          alert('Please fill in both email and password.');
        }
      });
    }
  
    if (registerForm) {
      registerForm.addEventListener('submit', function(e) {
        const name = registerForm.querySelector('input[type="text"]').value;
        const email = registerForm.querySelector('input[type="email"]').value;
        const password = registerForm.querySelector('input[type="password"]').value;
        if (!name || !email || !password) {
          e.preventDefault();
          alert('Please fill in all fields.');
        }
      });
    }
  
    if (forgotPasswordForm) {
      forgotPasswordForm.addEventListener('submit', function(e) {
        const email = forgotPasswordForm.querySelector('input[type="email"]').value;
        if (!email) {
          e.preventDefault();
          alert('Please enter your email address.');
        }
      });
    }
  });
  