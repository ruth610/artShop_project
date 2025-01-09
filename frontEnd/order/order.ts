interface Product {
  id: number;
  title: string;
  quantity: number;
  price: number;
}

interface OrderHistoryItem {
  id: number;
  products: Product[];
  total: number;
  createdAt: string;
}

// Fetch order details for the user
const fetchOrderDetails = async (token: string): Promise<Product[]> => {
  try {
    const response = await fetch("http://localhost:3000/order", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch order details.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching order details:", error);
    return [];
  }
};

// Fetch order history for the user
const fetchOrderHistory = async (token: string): Promise<OrderHistoryItem[]> => {
  try {
    const response = await fetch("http://localhost:3000/order", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch order history.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching order history:", error);
    return [];
  }
};

// Calculate total price of products
const calculateTotalPrice = (products: Product[]): number => {
  return products.reduce((total, product) => total + product.quantity * product.price, 0);
};

// Render order table
const renderOrderTable = (products: Product[]): void => {
  const tableBody = document.getElementById("order-table-body") as HTMLTableSectionElement;
  const totalPriceElement = document.getElementById("total-price") as HTMLSpanElement;

  tableBody.innerHTML = ""; // Clear existing rows

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.title}</td>
      <td>${product.quantity}</td>
      <td>$${(product.quantity * product.price).toFixed(2)}</td>
    `;
    tableBody.appendChild(row);
  });

  totalPriceElement.textContent = calculateTotalPrice(products).toFixed(2); // Update total price
};

// Handle order button click
const handleOrderButtonClick = async (product: Product, token: string): Promise<void> => {
  const orderButton = document.getElementById("order-button") as HTMLButtonElement;
  const orderConfirmation = document.getElementById("order-confirmation") as HTMLDivElement;

  try {
    const response = await fetch("http://localhost:3000/order", {
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
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Failed to place order. Please try again.");
  }
};

// Initialize page
document.addEventListener("DOMContentLoaded", async () => {
  // Retrieve the token from localStorage or sessionStorage
  const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

  if (!token) {
    alert("You are not logged in. Please log in to continue.");
    window.location.href = "/login.html"; // Redirect to login page
    return;
  }

  try {
    // Fetch user-specific order details
    const products = await fetchOrderDetails(token);
    renderOrderTable(products); // Render the table

    // Handle order button click
    const orderButton = document.getElementById("order-button") as HTMLButtonElement;
    orderButton.addEventListener("click", () => {
      const selectedProduct = products[0]; // Replace with actual selected product logic
      handleOrderButtonClick(selectedProduct, token);
    });
  } catch (error) {
    console.error("Error initializing page:", error);
    alert("Failed to load order details. Please try again.");
  }
});
