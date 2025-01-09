"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('login-username');
const passwordInput = document.getElementById('login-password');
loginForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    try {
        const response = yield fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            const data = yield response.json();
            console.log('Login successful:', data);
            localStorage.setItem('username', username);
            localStorage.setItem('accessToken', data.accessToken);
            window.location.href = '../home/index.html';
        }
        else {
            const error = yield response.json();
            console.error('Login failed:', error.message);
            alert('Login failed: ' + error.message);
        }
    }
    catch (err) {
        console.error('Error:', err);
        alert('An error occurred during login.');
    }
}));
