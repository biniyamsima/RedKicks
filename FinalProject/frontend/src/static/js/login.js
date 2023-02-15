import api from './APIClient.js';

const loginButton = document.querySelector('#loginButton');
const username = document.querySelector('#username');
const password = document.querySelector('#password');

const errorBox = document.querySelector('#errorbox');


loginButton.addEventListener('click', e => {

  errorBox.classList.add("hidden");

  api.logIn(username.value, password.value).then(userData => {
    localStorage.setItem('user', JSON.stringify(userData.user));
   
    if(userData.user.username == "admin") {
      document.location = "/admin"
    }
    else {
      document.location = "/";
    }
    
  }).catch((err) => {

    errorBox.classList.remove("hidden");
    errorBox.innerHTML = err;
  });
});



