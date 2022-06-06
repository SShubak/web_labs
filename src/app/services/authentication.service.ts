import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

interface User {
  user_id?: number,
  login: string,
  firstName: string,
  lastName: string,
}

export interface UpdateUser {
  firstName?: string,
  lastName?: string,
  password?: string,
}

interface LoginData {
  login: string,
  password: string
}

interface LoginResponse {
  user: User
}

interface RegistrationData {
  login: string,
  firstName: string,
  lastName: string,
  password: string,
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  url = 'http://127.0.0.1:5000/';

  constructor(
    private http: HttpClient,
  ) {
  }

  login(data: LoginData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${data.login}:${data.password}`),
      }),
    };

    return this.http.get<LoginResponse>(this.url + `api/v1/getuser/`, httpOptions);
  }

  registration(data: RegistrationData) {
    return this.http.post(this.url + 'api/v1/User', data);
  }

  logout() {
    return this.http.post(this.url + 'api/v1/User/logout', {});
  }

  updateProfile(data: UpdateUser) {
    return this.http.put(this.url + 'api/v1/updateuser/', data);
  }
}
