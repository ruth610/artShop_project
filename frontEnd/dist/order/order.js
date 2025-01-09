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
const fetchOrderDetails = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("http://localhost:3000/order", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch order details.");
        }
        return yield response.json();
    }
    catch (error) {
        console.error("Error fetching order details:", error);
        return [];
    }
});
const fetchOrderHistory = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("http://localhost:3000/order", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch order history.");
        }
        return yield response.json();
    }
    catch (error) {
        console.error("Error fetching order history:", error);
        return [];
    }
});
const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => total + product.quantity * product.price, 0);
};
const renderOrderTable = (products) => {
    const tableBody = document.getElementById("order-table-body");
    const totalPriceElement = document.getElementById("total-price");
    tableBody.innerHTML = "";
    products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${product.title}</td>
      <td>${product.quantity}</td>
      <td>$${(product.quantity * product.price).toFixed(2)}</td>
    `;
        tableBody.appendChild(row);
    });
    totalPriceElement.textContent = calculateTotalPrice(products).toFixed(2);
};
const handleOrderButtonClick = (product, token) => __awaiter(void 0, void 0, void 0, function* () {
    const orderButton = document.getElementById("order-button");
    const orderConfirmation = document.getElementById("order-confirmation");
    try {
        const response = yield fetch("http://localhost:3000/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                items: [{ artId: product.id, quantity: 1 }],
            }),
        });
        if (!response.ok) {
            throw new Error("Failed to place order.");
        }
        orderButton.disabled = true;
        orderButton.textContent = "Order Placed";
        orderConfirmation.classList.remove("d-none");
    }
    catch (error) {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
    }
});
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    if (!token) {
        alert("You are not logged in. Please log in to continue.");
        window.location.href = "/login.html";
        return;
    }
    try {
        const products = yield fetchOrderDetails(token);
        renderOrderTable(products);
        const orderButton = document.getElementById("order-button");
        orderButton.addEventListener("click", () => {
            const selectedProduct = products[0];
            handleOrderButtonClick(selectedProduct, token);
        });
    }
    catch (error) {
        console.error("Error initializing page:", error);
        alert("Failed to load order details. Please try again.");
    }
}));
