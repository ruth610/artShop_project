const form = document.getElementById('signup-form') as HTMLFormElement;
const usernameInputt = document.getElementById('signup-username') as HTMLInputElement;
const emailInput = document.getElementById('signup-email') as HTMLInputElement;
const passwordInputt = document.getElementById('signup-password') as HTMLInputElement;

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = usernameInputt.value;
  const email = emailInput.value;
  const password = passwordInputt.value;

  try {
    const response = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      console.log('Signup successful');
      alert('Signup successful! Please log in.');
      // Redirect to the login page
      window.location.href = 'login.html'; // Replace with your login page URL
    } else {
      const error = await response.json();
      console.error('Signup failed:', error.message);
      alert('Signup failed: ' + error.message);
    }
  } catch (err) {
    console.error('Error:', err);
    alert('An error occurred during signup.');
  }
});
