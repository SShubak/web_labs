import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavigationModule} from "./navigation-section/navigation/navigation.module";
import {PharmacyModule} from "./pharmacy-section/pharmacy.module";
import {UserSectionModule} from "./user-section/user-section.module";
import {RouterModule} from "@angular/router";
import {routes} from "./application-routes";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./services/interceptors/jwt.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NavigationModule,
    PharmacyModule,
    UserSectionModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
