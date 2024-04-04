import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  isLoading!: boolean;
  

  constructor(loadingservice: LoadingService) {
    loadingservice.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
 
  }
}
