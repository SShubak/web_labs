import * as cookie from './cookie.mjs'

const API = 'http://127.0.0.1:5000';
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const login = document.querySelector('#login');

const user = JSON.parse(cookie.getCookie('user'));
firstName.innerHTML = user.firstName;
lastName.innerHTML  = user.lastName;
login.innerHTML  = user.login;

document.querySelector('.logout').onclick = function (event) {
    event.preventDefault();
    const data = {}

    fetch(API + '/api/v1/User/logout', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.status === 200) {
            cookie.clearCookie('token');
            cookie.clearCookie('user');
            window.location.replace('login.html');
            return response.json();
        }
        throw response.status;
    }).catch((error) => {
        if (error === 401) {
            alert('JWT token was not provided or it is invalid');
        }
    });

}
