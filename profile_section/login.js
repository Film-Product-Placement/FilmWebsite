/*document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var isAuthenticated;

    if (username === 'likhith' && password === 'seera') {
      isAuthenticated = true;
    } else {
      isAuthenticated = false;
    }

    if (isAuthenticated) {
      window.location.href = 'profile.html';
    } else {
      alert('Invalid username or password. Please try again.');
    }
  });
});*/
/* document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('submit').addEventListener('click', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
          const data = await response.json();
          alert(data.message);
          localStorage.setItem('token', data.token); // store JWT token
          window.location.href = 'profile.html'; // turn to profile
      } else {
          const error = await response.json();
          alert(`Login failed: ${error.message}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  });
}); */

document.addEventListener('DOMContentLoaded', function () {
  const submitButton = document.getElementById('submit');
  if (submitButton) {
    submitButton.addEventListener('click', async function (event) {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          localStorage.setItem('token', data.token); // store JWT token
          localStorage.setItem('email', email); // store users' email
          // Check user type and redirect accordingly
          if (data.user.isAdmin) {
            window.location.href = 'adminProfile.html'; // redirect to admin profile
          } else if (data.user.accountType === 'filmmaker') {
            window.location.href = 'filmmaker_profile.html'; // redirect to filmmaker profile
          } else if (data.user.accountType === 'bidder') {
            window.location.href = 'filmbidder_profile.html'; // redirect to filmbidder profile
          } else {
            window.location.href = 'profile.html'; // default user profile
          }
        } else {
          const error = await response.json();
          alert(`Login failed: ${error.message}`);
        }
      } catch (err) {
        console.error(err.message);
      }
    });
  } else {
    console.error('Submit button not found');
  }
});
