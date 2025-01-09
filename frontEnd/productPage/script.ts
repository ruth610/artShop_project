interface ArtItem {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  description: string;
}

// Utility function to get query parameters
const getQueryParam = (param: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

// Function to load product details from the API
const loadProductDetails = async (): Promise<void> => {
  const productId = getQueryParam("id"); // Get the product ID from the URL
  if (!productId) {
    // alert("Product ID not found in the URL.");
    return;
  }

  try {
    // Fetch product details from the API
    const response = await fetch(`http://localhost:3000/art/${productId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product details.");
    }

    const product: ArtItem = await response.json();

    // Update the DOM with product details
    const imageElement = document.getElementById("product-image") as HTMLImageElement;
    const titleElement = document.getElementById("product-title") as HTMLHeadingElement;
    const priceElement = document.getElementById("product-price") as HTMLParagraphElement;
    const descriptionElement = document.getElementById("product-description") as HTMLParagraphElement;

    if (imageElement && titleElement && priceElement && descriptionElement) {
      imageElement.src = `http://localhost:3000/uploads/${product.imageUrl}`;
      titleElement.innerText = product.title;
      priceElement.innerText = `$${product.price}`;
      descriptionElement.innerText = product.description || "No description available.";
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    // alert("Failed to load product details. Please try again later.");
  }
};

// Redirect function for the "Shop Now" button
const redirectToOrderPage1 = (product: Product) => {
  // Save product details to localStorage or sessionStorage
  localStorage.setItem("product", JSON.stringify(product));
  
  // Redirect to the order page
  window.location.href = "../order/order.html";
};

// Event listener to load product details on DOMContentLoaded
document.addEventListener("DOMContentLoaded", loadProductDetails);
