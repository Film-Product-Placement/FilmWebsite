document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', function(event) {
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
  });