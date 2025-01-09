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
const form = document.getElementById('signup-form');
const usernameInputt = document.getElementById('signup-username');
const emailInput = document.getElementById('signup-email');
const passwordInputt = document.getElementById('signup-password');
form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const username = usernameInputt.value;
    const email = emailInput.value;
    const password = passwordInputt.value;
    try {
        const response = yield fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        if (response.ok) {
            console.log('Signup successful');
            alert('Signup successful! Please log in.');
            window.location.href = 'login.html';
        }
        else {
            const error = yield response.json();
            console.error('Signup failed:', error.message);
            alert('Signup failed: ' + error.message);
        }
    }
    catch (err) {
        console.error('Error:', err);
        alert('An error occurred during signup.');
    }
}));
