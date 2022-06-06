import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  readonly API: string = 'http://127.0.0.1:5000';
  private authToken: string = '';
  form: FormGroup = {} as FormGroup;

  user !: {
    firstName: string,
    lastName: string,
    login: string,
    id_user: number
  };

  constructor(
    private cookie: CookieService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookie.get('user'));
    this.form = new FormGroup({
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      password: new FormControl(''),
      rpassword: new FormControl('')
    })
  }

  submit(): void {
    this.authToken = this.cookie.get('access_token');

    const data = this.form.getRawValue();


    if(data.password){
      if (data.password !== data.password && data.password.length < 8){
        alert('Incorrect password')
        return;
      }
    }


    if (data.rpassword === '' && data.password === '') {
      delete data.rpassword;
      delete data.password;
    }

    data['login'] = this.user.login
    this.http.put(this.API + '/api/v1/updateuser', data).subscribe({
      next: () => {
        this.cookie.set('user', JSON.stringify({...data, id_user:this.user.id_user}), 60);
        alert('updated')
      },
      error: (err => {
        if (err.status === 403) {
          alert('Try again!');
        }
      })
    });
  }

}
