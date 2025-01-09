const loginForm = document.getElementById('login-form') as HTMLFormElement;
const usernameInput = document.getElementById('login-username') as HTMLInputElement;
const passwordInput = document.getElementById('login-password') as HTMLInputElement;

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Login successful:', data);

      // Save the email or token (if returned) to localStorage
      localStorage.setItem('username', username); // Assuming username is the email
      localStorage.setItem('accessToken', data.accessToken);

      // Redirect to the home page
      window.location.href = '../home/index.html'; // Replace with your home page URL
    } else {
      const error = await response.json();
      console.error('Login failed:', error.message);
      alert('Login failed: ' + error.message);
    }
  } catch (err) {
    console.error('Error:', err);
    alert('An error occurred during login.');
  }
});
