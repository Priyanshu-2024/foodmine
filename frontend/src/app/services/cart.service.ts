import { Injectable, OnInit } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/cartitem';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  private cart: Cart = this.getCartFromLocalStorage();

  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find((item) => {
      if (item.food) {
        return item.food.id == food.id;
      }
      return false;
    });

    if (cartItem) {
      console.log(cartItem);
      console.log('Item already exists in cart.');
      return;
    }
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id != foodId);

    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;

    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();

    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.price,
      0
    );

    this.cart.totalCount = this.cart.items.reduce(
      (prevSum, currentCount) => prevSum + currentCount.quantity,
      0
    );
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);

    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
