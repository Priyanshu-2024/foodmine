import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './feature/partials/header/header.component';
import { HomeComponent } from './feature/pages/home/home.component';
import { FoodPageComponent } from './feature/pages/food-page/food-page.component';
import { CartPageComponent } from './feature/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './feature/pages/login-page/login-page.component';
import { RegisterPageComponent } from './feature/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './feature/pages/checkout-page/checkout-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './feature/pages/payment-page/payment-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'header', component: HeaderComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'food/:id', component: FoodPageComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payment',
    component: PaymentPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
