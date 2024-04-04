import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './feature/partials/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './feature/pages/home/home.component';
import { RatingModule } from 'ng-starrating';
import { SearchComponent } from './feature/partials/search/search.component';
import { TagsComponent } from './feature/partials/tags/tags.component';
import { FoodPageComponent } from './feature/pages/food-page/food-page.component';
import { CartPageComponent } from './feature/pages/cart-page/cart-page.component';
import { TitleComponent } from './feature/partials/title/title.component';
import { NotFoundComponent } from './feature/partials/not-found/not-found.component';
import { LoginPageComponent } from './feature/pages/login-page/login-page.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputContainerComponent } from './feature/partials/input-container/input-container.component';
import { RegisterPageComponent } from './feature/pages/register-page/register-page.component';
import { TextInputComponent } from './feature/partials/text-input/text-input.component';
import { InputValidationComponent } from './feature/partials/input-validation/input-validation.component';
import { DefaultButtonComponent } from './feature/partials/default-button/default-button.component';

import { LoadingComponent } from './feature/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { CheckoutPageComponent } from './feature/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './feature/partials/order-items-list/order-items-list.component';
import { MapComponent } from './feature/partials/map/map.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentPageComponent } from './feature/pages/payment-page/payment-page.component';
import { PaypalButtonComponent } from './feature/partials/paypal-button/paypal-button.component';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [
    AppComponent,
    InputValidationComponent,
    TextInputComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginPageComponent,
    InputContainerComponent,
    RegisterPageComponent,
    TextInputComponent,
    DefaultButtonComponent,

    LoadingComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    MapComponent,
    PaymentPageComponent,
    PaypalButtonComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    RatingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
