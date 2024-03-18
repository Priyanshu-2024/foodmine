import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { usermodel } from 'src/app/shared/models/user-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  cartquantity = 0;
  user!:usermodel;

  
  constructor(cartservice : CartService,private userservice : UserService){
    cartservice.getCartObservable().subscribe((newcart) => {
      this.cartquantity = newcart.totalcount
    })

    userservice.userObservable.subscribe((newuser) =>{
      this.user = newuser
    })
  }

  logout(){
    this.userservice.logout();
  }

  get isAuth(){
    return this.user.token;
  }
}
