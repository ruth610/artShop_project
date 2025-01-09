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
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
    });
});
const navBtn = document.getElementById('loginNav');
navBtn === null || navBtn === void 0 ? void 0 : navBtn.addEventListener('click', () => {
    window.location.href = '../LoginPage/index.html';
});
const backgroundImages = [
    "../assets/images/et1.jpg",
    "../assets/images/banner2.jpg",
    "../assets/images/banner3.jpg",
];
let art = [];
let painting = [];
let nature = [];
const fetchArtworks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/art');
        const data = yield response.json();
        art = data.filter((item) => item.category === 'sculpture');
        painting = data.filter((item) => item.category === 'painting');
        nature = data.filter((item) => item.category === 'nature');
    }
    catch (error) {
        console.error('Error fetching artworks:', error);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const productsContainers = document.querySelectorAll(".products");
    const nextButtons = document.querySelectorAll(".next");
    const prevButtons = document.querySelectorAll(".prev");
    const itemsPerPage = window.innerWidth < 768 ? 2 : 4;
    const indices = {
        painting: 0,
        sculpture: 0,
        nature: 0,
    };
    function renderProducts() {
        productsContainers.forEach((products) => {
            const section = products.classList.contains("painting")
                ? "painting"
                : products.classList.contains("nature")
                    ? "nature"
                    : "sculpture";
            const currentIndex = indices[section];
            const visibleItems = section === "painting"
                ? [
                    ...painting.slice(currentIndex, currentIndex + itemsPerPage),
                    ...painting.slice(0, Math.max(0, currentIndex + itemsPerPage - painting.length)),
                ]
                : section === "nature"
                    ? [
                        ...nature.slice(currentIndex, currentIndex + itemsPerPage),
                        ...nature.slice(0, Math.max(0, currentIndex + itemsPerPage - nature.length)),
                    ]
                    : [
                        ...art.slice(currentIndex, currentIndex + itemsPerPage),
                        ...art.slice(0, Math.max(0, currentIndex + itemsPerPage - art.length)),
                    ];
            products.innerHTML = visibleItems
                .map((item) => `
            <div class="product">
              <img src="http://localhost:3000/uploads/${item.imageUrl}" alt="${item.title}" />
              <div class="describe">
                <span class="title">${item.title}</span>
                <span class="price">${item.price}$</span>
              </div>
              <div class="homeBtns">
                <a class="btn" href="../order/order.html">Shop Now</a>
                <a class="btn" href="../productPage/index.html?id=${item.id}">Learn More</a>
              </div>
            </div>
          `)
                .join("");
        });
    }
    ;
    nextButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const section = button.dataset.section;
            indices[section] = (indices[section] + itemsPerPage) % (section === "painting" ? painting.length : section === "nature" ? nature.length : art.length);
            renderProducts();
        });
    });
    prevButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const section = button.dataset.section;
            const totalLength = section === "painting" ? painting.length : section === "nature" ? nature.length : art.length;
            indices[section] = (indices[section] - itemsPerPage + totalLength) % totalLength;
            renderProducts();
        });
    });
    window.addEventListener("resize", () => {
        renderProducts();
    });
    fetchArtworks().then(() => {
        renderProducts();
    });
    let currentIndex = 0;
    const changeBackgroundImage = () => {
        const heroSection = document.getElementById("hero-section");
        if (heroSection) {
            heroSection.style.backgroundImage = `url('${backgroundImages[currentIndex]}')`;
            currentIndex = (currentIndex + 1) % backgroundImages.length;
        }
    };
    setInterval(changeBackgroundImage, 5000);
});
const redirectToOrderPage = (product) => {
    localStorage.setItem("product", JSON.stringify(product));
    window.location.href = "../order/order.html";
};
window.redirectToOrderPage = redirectToOrderPage;
const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};
const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
});
document.querySelectorAll('.observe').forEach(element => {
    observer.observe(element);
});
const userEmailElement = document.getElementById('loginNav');
const username1 = localStorage.getItem('username');
if (username1) {
    userEmailElement.textContent = `${username1}`;
}
else {
    window.location.href = '../login/index.html';
}
