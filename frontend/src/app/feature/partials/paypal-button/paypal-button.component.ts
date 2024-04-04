import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements OnInit{
  
  @Input()
  order!:Order;

  @ViewChild('paypal', {static: true})
  paypalElement!:ElementRef;

  constructor(){}
  ngOnInit(): void {
  }

}
