import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup = {} as FormGroup;

  constructor(
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: '',
      lastName: '',
      login: '',
      password: '',
      rpassword: ''
    })
  }

  submit(): void{
    const data = this.form.getRawValue();

    if(data.password != data.rpassword || data.password.length < 8){
      alert('Incorrect password')
      return;
    }

    delete data.rpassword;

    this.auth.registration(data).subscribe({
      next: () => {
        this.router.navigate(['login']);
      },
      error: err => {
        if(err.status === 403){
          alert('Wrong Data');
        }
      }
    })
  }
}
