import * as cookie from './cookie.mjs'

const API = 'http://127.0.0.1:5000';

const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const npassword = document.querySelector('#password');
const rpassword = document.querySelector('#repeat-password');

const authToken = cookie.getAuthToken();

const user = JSON.parse(cookie.getCookie('user'));
firstName.value = user.firstName;
lastName.value = user.lastName;



document.querySelector('.submit-btn').onclick = function (event) {
    event.preventDefault();

    if (!validate()) {
        return;
    }

    const firstNameValue = firstName.value;
    const lastNameValue = lastName.value;
    const npasswordlValue = npassword.value;

    const data = {
        'firstName': firstNameValue,
        'lastName': lastNameValue,
    }

    if (npasswordlValue !== '') {
        data['password'] = npasswordlValue
    }

    fetch(API + '/api/v1/updateuser', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Basic ' + authToken
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.status === 200) {
            cookie.setCookie('user', JSON.stringify(data), 60);
            window.location.replace('account.html');
            return response.json();
        }
        throw response.status;
    }).catch((error) => {
        console.log(error);
        if (error === 401) {
            alert('JWT token was not provided or it is invalid');
        }
        if (error === 404) {
            alert('User is not found.');
        }
    });
}

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

function validate() {
    let status = true

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

    if (npassword.value !== rpassword.value ) {
        npassword.placeholder = 'Password do not match';
        rpassword.placeholder = 'Password do not match';
        status = false;
    }

    return status;
}

