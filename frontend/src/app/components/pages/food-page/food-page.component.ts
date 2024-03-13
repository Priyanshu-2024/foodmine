import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { food } from 'src/app/shared/models/food-model';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css'],
})
export class FoodPageComponent {
  food!: food;

  constructor(
    activatedroute: ActivatedRoute,
    foodservice: FoodService,
    private cartservice: CartService,
    private router: Router
  ) {
    activatedroute.params.subscribe(params => {
      if (params.id)
        foodservice.getfoodbyid(params.id).subscribe((serverfoods) => {
          this.food = serverfoods;
        });
    });
  }
  addTocart() {
    this.cartservice.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
