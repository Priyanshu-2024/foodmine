import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchterm = '';

  constructor(private router: Router, activatedroute: ActivatedRoute) {
    activatedroute.params.subscribe((params) => {
      if (params.searchterm) {
        this.searchterm = params.searchterm;
      }
    });
  }

  search(term: string): void {
    if (term) {
      this.router.navigateByUrl('/search/' + term);
    }
  }
}
