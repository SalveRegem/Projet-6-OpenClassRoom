const form = document.getElementById('form-login');


form.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const data = new FormData(form); 
    console.log(data);

    
    const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email: data.get('email'), 
            password: data.get('password') 
        })
    });

    if (response.ok) {
        const result = await response.json(); 
        window.localStorage.setItem('token', result.token);
        window.location = "index.html";
        window.localStorage.getItem("token")
    } else {
        document.querySelector(".logged_error").style.visibility = "visible";
        const errorMessage = await response.text(); 
        errorMessage.innerHTML = `Erreur de connexion : ${errorMessage}`;
    }
});

// if(window.localStorage.getItem('token') !== null) {
//     // Show Edit Mode on top page
//     document.querySelector('.mode_edition').style.display = 'flex';
//     document.querySelectorAll(".edit-btn").style.display = "flex";

//     // Change button login text by "logout"
//     const loginBtn = document.querySelector('.login_selector');
//     loginBtn.innerHTML = "logout";
//     loginBtn.href = '#';
    
//     // Logout user
//     loginBtn.addEventListener('click', (e) => {
//         e.preventDefault();
//         window.localStorage.removeItem('token');
//         window.location = "index.html";
//     })

//     // Hide filters
//     document.querySelector('.filter').style.display = 'none';
// }