import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  get isUserLoggedIn() {
    return this.cookieService.get('user') !== ''
  }

  constructor(
    private cookieService: CookieService,
    private auth: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.cookieService.deleteAll();
      this.router.navigate(['/login']);
    })
  }

}
