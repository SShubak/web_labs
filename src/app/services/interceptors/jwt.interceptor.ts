import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private cookie: CookieService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.cookie.get('access_token') !== '') {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${this.cookie.get('access_token')}`,
        },
      });
    }
    return next.handle(request);
  }
}
