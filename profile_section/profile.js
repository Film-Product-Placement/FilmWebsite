document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('No token found. Please log in.');
        window.location.href = 'login.html';
        return;
    }
    try {
        const response = await fetch('/api/users/profile', {
            method: 'GET',
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('username').innerText = data.username;
            document.getElementById('email').innerText = data.email;

            // display or hide 'Fetch Admin Dashboard' button
            if (data.isAdmin) {
                document.getElementById('fetchDashboard').style.display = 'block';
            } else {
                document.getElementById('fetchDashboard').style.display = 'none';
            }
        } else {
            const error = await response.json();
            alert(`Failed to load profile: ${error.message}`);
            window.location.href = 'login.html';
        }
    } catch (err) {
        console.error(err.message);
    }
});
