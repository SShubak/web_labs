import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = {} as FormGroup;

  constructor(
    private auth: AuthenticationService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: '',
      password: ''
    })
  }

  submit(): void {
    const user = this.form.getRawValue();
    this.auth.login(user).subscribe({
      next: (data) => {
        this.cookieService.set('access_token', btoa(user.login + ':' + user.password),60);
        this.cookieService.set('user', JSON.stringify(data['user']), 60);
        this.router.navigate(['/store']);
      },
      error: (err => {
        if (err.status === 403) {
          alert('Wrong Data');
        }
      })
    });
  }

}
