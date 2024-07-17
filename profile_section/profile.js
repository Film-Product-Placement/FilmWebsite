document.addEventListener('DOMContentLoaded', async () => {
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
        } else {
            const error = await response.json();
            alert(`Failed to load profile: ${error.message}`);
        }
    } catch (err) {
        console.error(err.message);
    }
});
