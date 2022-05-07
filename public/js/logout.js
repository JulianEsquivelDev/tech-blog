async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');

    } else {
        alert(response.statusText);
    }
}
// event listener to trigger the user to be logged out when they click the button that is labeled logout
document.querySelector('#logout').addEventListener('click', logout);