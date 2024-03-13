import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { food } from 'src/app/shared/models/food-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  foods : food[] = [];
  
  constructor(
    private foodservice: FoodService,
     activatedroute: ActivatedRoute
  ) {
    activatedroute.params.subscribe((params) => {
      let foodsObservable:Observable <food[]>

      if (params.searchterm) {
        foodsObservable = this.foodservice.getfoodbysearch(params.searchterm);
      } else if (params.tag) {
        foodsObservable= this.foodservice.getallfoodsbytag(params.tag);
      } else {
        foodsObservable= foodservice.getAll();
        
       
      }
foodsObservable .subscribe((serverfoods) => {
            this.foods = serverfoods
          })
    });
  }
}

