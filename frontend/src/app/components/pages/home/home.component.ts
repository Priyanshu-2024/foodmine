import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { food } from 'src/app/shared/models/food-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  foods: food[] = [];
  constructor(
    private foodservice: FoodService,
    private activatedroute: ActivatedRoute
  ) {
    activatedroute.params.subscribe((params) => {
      if (params.searchterm) {
        this.foods = this.foodservice.getfoodbysearch(params.searchterm);
      }else if(params.tag){
        this.foods = this.foodservice.getallfoodsbytag(params.tag)
      } 
      else {
        this.foods = foodservice.getAll();
      }
    });
  }
}
