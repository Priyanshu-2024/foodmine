import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/shared/models/cartitem';
import { cart } from 'src/app/shared/models/carts';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
Cart! : cart;
constructor(private cartservice:CartService){
  this.cartservice.getCartObservable().subscribe((carts)=>{
    this.Cart = carts
  })

}

  removeCart(cartItem:CartItem){
    this.cartservice.removeFromCart(cartItem.foods.id);
  }

  changeQuantity(cartItem:CartItem, quantityString:string){
    const quantity  = parseInt(quantityString);
    this.cartservice.changeQuantity(cartItem.foods.id,quantity);
  }
}
