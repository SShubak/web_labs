import * as cookie from './cookie.mjs'

const API = 'http://127.0.0.1:5000';

document.querySelector('.submit-btn').onclick = function (event) {
    event.preventDefault();

    const user = {
        login: document.querySelector('#login').value,
        password: document.querySelector('#password').value
    }

    fetch(API + '/api/v1/getuser/', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Basic ${btoa(user.login + ':' + user.password)}`
        }
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        }
        throw response.status;
    }).then(data => {
        cookie.setCookie('token', btoa(user.login + ':' + user.password), 60);
        cookie.setCookie('user', JSON.stringify(data['user']), 60);
        window.location.replace('account.html');
    }).catch((error) => {
        if (error === 403) {
            alert("Wrong password or user with this email doesn't exist");
        }
    });
}
