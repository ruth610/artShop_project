"use strict";
const validUsername = "user";
const validPassword = "password123";
const handleLogin = (event) => {
    var _a, _b;
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === validUsername && password === validPassword) {
        (_a = document.getElementById("login-form")) === null || _a === void 0 ? void 0 : _a.classList.add("d-none");
        (_b = document.getElementById("logout-btn")) === null || _b === void 0 ? void 0 : _b.classList.remove("d-none");
    }
    else {
        alert("Invalid username or password.");
    }
    return false;
};
const handleLogout = () => {
    var _a, _b;
    (_a = document.getElementById("login-form")) === null || _a === void 0 ? void 0 : _a.classList.remove("d-none");
    (_b = document.getElementById("logout-btn")) === null || _b === void 0 ? void 0 : _b.classList.add("d-none");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
};
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
