import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/cart';
import { CartItem } from 'src/app/shared/models/cartitem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  removeCart(_t10: any) {
    throw new Error('Method not implemented.');
  }
  cart!: Cart;
  constructor(
    private cartServices: CartService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.cartServices.getCartObservable().subscribe((cart) => {
      console.log(cart);

      this.cart = cart;
    });
  }

  removeFromCart(cartItem: CartItem) {
    if (cartItem) {
      console.log(cartItem.food);
      this.cartServices.removeFromCart(cartItem.food.id);
    }
  }
  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartServices.changeQuantity(cartItem.food.id, quantity);
  }
}
