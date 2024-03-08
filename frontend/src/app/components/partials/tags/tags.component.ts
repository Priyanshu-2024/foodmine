import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { food } from 'src/app/shared/models/food-model';
import { tags } from 'src/app/shared/models/tags-model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  tags?:tags[];

  constructor(foodservice:FoodService){
    this.tags = foodservice.getalltags();
  }
  
}
