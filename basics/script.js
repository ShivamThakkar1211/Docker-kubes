function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function clearError(elementId) {
    document.getElementById(elementId).textContent = '';
}

function validateFirstName() {
    const firstName = document.getElementById("first-name").value.trim();
    const nameRegex = /^[A-Za-z]{6,}$/;
    if (firstName.charAt(0) !== firstName.charAt(0).toUpperCase()) {
        showError("first-name-error", "First name should start with a capital letter.");
        return false;
    }
    if (!nameRegex.test(firstName)) {
        showError("first-name-error", "Only alphabets allowed and minimum 6 characters.");
        return false;
    }
    clearError("first-name-error");
    return true;
}

function validatePassword() {
    const pass = document.getElementById("password").value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(pass)) {
        showError("password-error", "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
        return false;
    }
    if (pass.length < 6) {
        showError("password-error", "Password should be at least 6 characters long.");
        return false;
    }
    clearError("password-error");
    return true;
}

function validateEmail() {
    const email = document.getElementById("email").value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        showError("email-error", "Invalid email ID.");
        return false;
    }
    clearError("email-error");
    return true;
}

function validateMobileNumber() {
    const tel = document.getElementById("mobile-number").value;
    const mobileRegex = /^\d{10}$/;
    if (!/^[6789]/.test(tel)) {
        showError("mobile-number-error", "Number should start from 6, 7, 8, or 9.");
        return false;
    }
    if (!mobileRegex.test(tel)) {
        showError("mobile-number-error", "Mobile number should contain exactly 10 digits.");
        return false;
    }
    clearError("mobile-number-error");
    return true;
}

document.getElementById("first-name").addEventListener("input", validateFirstName);
document.getElementById("first-name").addEventListener("blur", validateFirstName);

document.getElementById("password").addEventListener("input", validatePassword);
document.getElementById("password").addEventListener("blur", validatePassword);

document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("email").addEventListener("blur", validateEmail);

document.getElementById("mobile-number").addEventListener("input", validateMobileNumber);
document.getElementById("mobile-number").addEventListener("blur", validateMobileNumber);

document.getElementById("form").onsubmit = function (e) {
    e.preventDefault();
    const isValid = validateFirstName() & validatePassword() & validateEmail() & validateMobileNumber();
    if (isValid) {
        alert("Registration form submitted successfully");
    }
};