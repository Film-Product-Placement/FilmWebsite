//0729
/*document.addEventListener('DOMContentLoaded', async () => {

    const token = localStorage.getItem('token');
    if (!token) {
        alert('No token found. Please log in.');
        window.location.href = 'login.html';
        return;
    }

    try {

        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'login.html';
            return;
        }

        //const response = await fetch('/api/users/profile', {
            //method: 'GET',
            //headers: {
              //  'x-auth-token': localStorage.getItem('token')
            //}
        //});

        const response = await fetch('/api/users/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('username').innerText = data.username;
            document.getElementById('email').innerText = data.email;

            // if admin, display admin content
            if (data.isAdmin) {
                document.getElementById('admin-actions').style.display = 'block';
            } else {
                document.getElementById('admin-actions').style.display = 'none';
            }

        } else {
            const error = await response.json();
            alert(`Failed to load profile: ${error.message}`);
            window.location.href = 'login.html';
        }
    } catch (err) {
        console.error(err.message);
        window.location.href = 'login.html';
    }

    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });

});*/

//0814
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
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('username').innerText = data.username;
            document.getElementById('email').innerText = data.email;

            // Redirect based on user role
            if (data.isAdmin) {
                //document.getElementById('admin-actions').style.display = 'block';
                window.location.href = 'adminProfile.html';
            } else if (data.accountType === 'filmmaker') {
                window.location.href = 'filmmaker_profile.html';
            } else if (data.accountType === 'bidder') {
                window.location.href = 'filmbidder_profile.html';
            } /*else {
                document.getElementById('admin-actions').style.display = 'none';
            }*/
        } else {
            const error = await response.json();
            alert(`Failed to load profile: ${error.message}`);
            window.location.href = 'login.html';
        }
    } catch (err) {
        console.error(err.message);
        window.location.href = 'login.html';
    }

    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });
});

