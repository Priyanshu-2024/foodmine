import { Injectable } from '@angular/core';
import { food } from '../shared/models/food-model';
import { sample_foods, sample_tags } from 'src/data';
import { tags } from '../shared/models/tags-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  FOODS_BY_ID_URL,
  FOODS_BY_TAG_URL,
  FOODS_SEARCH_URL,
  FOODS_TAG_URL,
  FOODS_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<food[]> {
    return this.http.get<food[]>(FOODS_URL);
  }

  getfoodbysearch(searchTerm: string):Observable<food[]> {
    return this.http.get<food[]>(FOODS_SEARCH_URL + searchTerm);
  }

  getalltags(): Observable<tags[]> {
    return this.http.get<tags[]>(FOODS_TAG_URL);
  }

  getallfoodsbytag(tag: string): Observable<food[]> {
    return tag === 'All'
      ? this.getAll()
      : this.http.get<food[]>(FOODS_BY_TAG_URL + tag);
  }

  getfoodbyid(foodid: string): Observable<food> {
    return this.http.get<food>(FOODS_BY_ID_URL + foodid);
  }
}
