import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_models/product';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  products: Product[];
  overallPrice: number = 0;
  constructor(private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.products = data['products'];
    });
    this.products.forEach(product => {
      this.overallPrice += product.price;
    });
  }

}
