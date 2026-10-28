/**
 * Switch between Login and Registration tabs
 */
function switchTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginBtn = document.getElementById('loginTabBtn');
  const registerBtn = document.getElementById('registerTabBtn');

  hideAlert();

  if (tab === 'login') {
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    loginBtn.classList.add('active');
    registerBtn.classList.remove('active');
  } else {
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    registerBtn.classList.add('active');
    loginBtn.classList.remove('active');
  }
}

/**
 * Toggle password visibility (show/hide password text)
 */
function togglePasswordVisibility(inputId, iconElement) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    iconElement.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    iconElement.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

/**
 * Check password strength in real-time
 */
function checkPasswordStrength(password) {
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');

  if (!password) {
    strengthBar.style.width = '0%';
    strengthText.textContent = '';
    return;
  }

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  switch (score) {
    case 1:
      strengthBar.style.width = '25%';
      strengthBar.style.backgroundColor = 'var(--danger-color)';
      strengthText.textContent = 'Weak password';
      strengthText.style.color = 'var(--danger-color)';
      break;
    case 2:
      strengthBar.style.width = '50%';
      strengthBar.style.backgroundColor = 'var(--warning-color)';
      strengthText.textContent = 'Moderate password';
      strengthText.style.color = 'var(--warning-color)';
      break;
    case 3:
      strengthBar.style.width = '75%';
      strengthBar.style.backgroundColor = 'var(--input-focus)';
      strengthText.textContent = 'Good password';
      strengthText.style.color = 'var(--input-focus)';
      break;
    case 4:
      strengthBar.style.width = '100%';
      strengthBar.style.backgroundColor = 'var(--success-color)';
      strengthText.textContent = 'Strong password!';
      strengthText.style.color = 'var(--success-color)';
      break;
  }
}

/**
 * Form Submit Handlers
 */
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  showAlert(`Welcome back! Logging in as ${email}...`, 'success');
}

function handleRegister(event) {
  event.preventDefault();
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;

  if (password !== confirmPassword) {
    showAlert('Passwords do not match.', 'error');
    return;
  }

  showAlert('Account successfully created!', 'success');
  event.target.reset();
  checkPasswordStrength('');
}

/**
 * Alert Box Helper
 */
function showAlert(message, type) {
  const alertBox = document.getElementById('alertBox');
  alertBox.textContent = message;
  alertBox.className = `alert ${type}`;
}

function hideAlert() {
  const alertBox = document.getElementById('alertBox');
  alertBox.className = 'alert hidden';
}