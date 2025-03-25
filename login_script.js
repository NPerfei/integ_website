document.querySelector(".wrapper .btn").addEventListener('click', (e) => {
    e.preventDefault();

    const usernameInput = document.querySelector('input[placeholder="Username"]').value;
    const passwordInput = document.querySelector('input[placeholder="Password"]').value;
    
    if (usernameInput == "admin" && passwordInput == "1234") {
        window.location.assign('./index.html');
    }
    else {
        showErr();
    }
});

function showErr() {
    let errDiv = document.querySelector('.err-div');
    errDiv.classList.add('show');

    setTimeout(() => {
        errDiv.classList.remove('show');
    }, 3000);
}