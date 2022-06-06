import {Routes} from "@angular/router";
import {LoginComponent} from "./user-section/authentication/login/login.component";
import {RegistrationComponent} from "./user-section/authentication/registration/registration.component";
import {StoreComponent} from "./pharmacy-section/store/store/store.component";
import {OrdersComponent} from "./pharmacy-section/orders/orders.component";
import {ProfileComponent} from "./user-section/profile/profile.component";
import {AuthGuard} from "./services/guards/auth.guard";


export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'store', component: StoreComponent, canActivate: [AuthGuard]},
  {path: 'my-orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'store'},
];
