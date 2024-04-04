import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponent implements OnInit {
   ngOnInit(): void {
    //  throw new Error('Method not implemented.');
   }
   constructor(){}
   @Input()
  label!:string;
  @Input()
  bgColor = 'white';
}



