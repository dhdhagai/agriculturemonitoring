// Function to get a cookie value by name
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

// Function to check login status and update the navbar
function checkLogin() {
    const loginDetails = getCookie('LOGIN_DETAILS'); // Check if login details are stored in cookies

    // Use a timeout to ensure the header is loaded first
    setTimeout(() => {
        const signContainer = document.getElementById('Sign');

        // If the user is not logged in, create a login button
        if (!loginDetails) {
            const loginButton = document.createElement('a');
            loginButton.href = 'login.html'; // Link to login page
            loginButton.innerText = 'Login';
            loginButton.className = 'nav-link'; // Add Bootstrap nav-link class
            signContainer.appendChild(loginButton);
        } else {
            // User is logged in, display their details
            try {
                const loginDetailsJSON = JSON.parse(decodeURIComponent(loginDetails));
                const username = loginDetailsJSON.username;

                // Create a new anchor element for the sign-in status
                const userLink = document.createElement("a");
                userLink.innerHTML = `Logged in as ${username}. Logout`;
                userLink.href = "logout.html"; // Logout link
                userLink.className = "nav-link"; // Add Bootstrap nav-link class

                // Append the user link to the sign container
                signContainer.appendChild(userLink);
            } catch (error) {
                console.error("Error parsing login details:", error);
            }
        }
    }, 100); // Delay for 100 milliseconds to allow for the header to load
}

// Call the checkLogin function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", checkLogin);
