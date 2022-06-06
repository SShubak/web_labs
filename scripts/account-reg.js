import * as cookie from "./cookie.mjs";

const API = 'http://127.0.0.1:5000';

const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const login = document.querySelector('#login');
const password = document.querySelector('#password');
const rpassword = document.querySelector('#repeat-password');

document.querySelector('.submit-btn').onclick = function (event) {
    event.preventDefault();

    if (!validate()) {
        return;
    }

    const firstNameValue = firstName.value;
    const lastNameValue = lastName.value;
    const loginValue = login.value;
    const passwordValue = password.value;

    const data = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        login: loginValue,
        password: passwordValue
    }


    fetch(API + '/api/v1/User', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.status === 200) {
            window.location.replace('login.html');
            return response.json();
        }
        throw response.status;
    }).catch((error) => {
        console.log(error);
        if (error === 400) {
            alert('User with such username already exists');
        }
        if (error === 403) {
            alert('Try again');
        }
    });
}

function validate() {
    let status = true

    if (password.value < 8) {
        password.value = '';
        password.placeholder = 'Incorrect password';
        status = false;
    }

    if (firstName.value === '') {
        firstName.placeholder = 'Write your name';
        status = false;
    }

    if (lastName.value === '') {
        lastName.placeholder = 'Write your name';
        status = false;
    }

    if (login.value === '') {
        login.placeholder = 'Write your surname';
        status = false;
    }

    if (password.value !== rpassword.value ) {
        password.placeholder = 'Password do not match';
        rpassword.placeholder = 'Password do not match';
        status = false;
    }

    return status;
}
