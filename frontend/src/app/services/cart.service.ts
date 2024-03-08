import { Injectable } from '@angular/core';
import { cart } from '../shared/models/carts';
import { BehaviorSubject, Observable } from 'rxjs';
import { food } from '../shared/models/food-model';
import { CartItem } from '../shared/models/cartitem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private carts: cart = this.getFromLocalStorage();
  private cartsubject: BehaviorSubject<cart> = new BehaviorSubject(this.carts);
  constructor() {}

  addToCart(foods: food): void {
    let cartItem = this.carts.items.find((item) => item.foods.id === foods.id);
    if (cartItem) {
      return;
    }
    this.carts.items.push(new CartItem(foods));
    this.setToLocalStorage();
  }

  removeFromCart(foodId: string): void {
    this.carts.items = this.carts.items.filter(
      (item) => item.foods.id !== foodId
    );
    this.setToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.carts.items.find((item) => item.foods.id === foodId);

    if (!cartItem) {
      return;
    }
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.foods.price;

    this.setToLocalStorage();
  }

  clearCart() {
    this.carts = new cart();
    this.setToLocalStorage();
  }

  getCartObservable(): Observable<cart> {
    return this.cartsubject.asObservable();
  }

  private setToLocalStorage(): void {
    this.carts.totalPrice = this.carts.items.reduce(
      (prevSum, CurrentItem) => prevSum + CurrentItem.price,
      0
    );
    this.carts.totalcount = this.carts.items.reduce(
      (prevSum, CurrentItem) => prevSum + CurrentItem.quantity,
      0
    );

    const cartJson = JSON.stringify(this.carts);
    localStorage.setItem('Cart', cartJson);
    this.cartsubject.next(this.carts);
  }

  private getFromLocalStorage(): cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new cart();
  }
}
