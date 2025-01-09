const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

const navBtn = document.getElementById('loginNav') as HTMLButtonElement;
navBtn?.addEventListener('click', () => {
  window.location.href = '../LoginPage/index.html';
});

// Array of background image URLs
const backgroundImages: string[] = [
  "../assets/images/et1.jpg", 
  "../assets/images/banner2.jpg",
  "../assets/images/banner3.jpg",
];

interface ArtItem {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  category: string; // Add category field
}

// Replace static data with dynamic API fetch
let art: ArtItem[] = [];
let painting: ArtItem[] = [];
let nature: ArtItem[] = [];

const fetchArtworks = async () => {
  try {
    const response = await fetch('http://localhost:3000/art'); // Your API endpoint
    const data = await response.json();

    // Categorize artworks based on their category
    art = data.filter((item: ArtItem) => item.category === 'sculpture');
    painting = data.filter((item: ArtItem) => item.category === 'painting');
    nature = data.filter((item: ArtItem) => item.category === 'nature');
    
    // renderProducts();
  } catch (error) {
    console.error('Error fetching artworks:', error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const productsContainers = document.querySelectorAll<HTMLElement>(".products");
  const nextButtons = document.querySelectorAll<HTMLButtonElement>(".next");
  const prevButtons = document.querySelectorAll<HTMLButtonElement>(".prev");

  const itemsPerPage = window.innerWidth < 768 ? 2 : 4; // Dynamic itemsPerPage
  const indices: { [key: string]: number } = {
    painting: 0,
    sculpture: 0,
    nature: 0, // Add nature category
  };

  function renderProducts(): void{
    productsContainers.forEach((products) => {
      const section = products.classList.contains("painting")
        ? "painting"
        : products.classList.contains("nature")
        ? "nature"
        : "sculpture";
      const currentIndex = indices[section];

      const visibleItems =
        section === "painting"
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
        .map(
          (item) => `
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
          `
        )
        .join("");
    });
  };

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.dataset.section as string;
      indices[section] = (indices[section] + itemsPerPage) % (section === "painting" ? painting.length : section === "nature" ? nature.length : art.length);
      renderProducts();
    });
  });

  prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.dataset.section as string;
      const totalLength = section === "painting" ? painting.length : section === "nature" ? nature.length : art.length;
      indices[section] = (indices[section] - itemsPerPage + totalLength) % totalLength;
      renderProducts();
    });
  });

  window.addEventListener("resize", () => {
    renderProducts();
  });

  // Initial render after fetching data
  fetchArtworks();
  renderProducts();

  // Background image rotation
  let currentIndex: number = 0;
  const changeBackgroundImage = (): void => {
    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      heroSection.style.backgroundImage = `url('${backgroundImages[currentIndex]}')`;
      currentIndex = (currentIndex + 1) % backgroundImages.length;
    }
  };

  setInterval(changeBackgroundImage, 5000);
});

// Redirect function for the "Shop Now" button
// Function to redirect to the order page with product details
const redirectToOrderPage = (product: Product) => {
  // Save product details to localStorage or sessionStorage
  localStorage.setItem("product", JSON.stringify(product));
  
  // Redirect to the order page
  window.location.href = "../order/order.html";
};

(window as any).redirectToOrderPage = redirectToOrderPage;

// Intersection Observer for animations
const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
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

// Display user's email
const userEmailElement = document.getElementById('loginNav') as HTMLElement;
const username1 = localStorage.getItem('username');

if (username1) {
  userEmailElement.textContent = `${username1}`;
} else {
  window.location.href = '../login/index.html';
}
// function renderProducts() {
//   throw new Error("Function not implemented.");
// }

