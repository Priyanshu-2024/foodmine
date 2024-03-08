import { food } from './food-model';

export class CartItem {
  constructor(public foods: food) {}
  quantity: number = 1;
  price: number = this.foods.price;
}
