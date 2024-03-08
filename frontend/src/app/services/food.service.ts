import { Injectable } from '@angular/core';
import { food } from '../shared/models/food-model';
import { sample_foods, sample_tags } from 'src/data';
import { tags } from '../shared/models/tags-model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  getAll(): food[] {
    return sample_foods;
  }
  getfoodbysearch(searchterm: string) {
    return this.getAll().filter((food) =>
      food.name.toLowerCase().includes(searchterm.toLowerCase())
    );
  }

  getalltags(): tags[] {
    return sample_tags;
  }

  getallfoodsbytag(tag: string): food[] {
    return tag === 'All'
      ? this.getAll()
      : this.getAll().filter((food) => food.tags?.includes(tag));
  }

  getfoodbyid(foodid: string): food {
    return this.getAll().find((food) => food.id == foodid) ?? new food();
  }
}
