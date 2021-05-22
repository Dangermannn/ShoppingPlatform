import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../_models/product';
import { AlertifyService } from '../_services/alertify.service';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  products: Product[];
  subscription: Subscription;
  constructor(private alertify: AlertifyService, private route: ActivatedRoute, private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.products = data['products'];
    });

    //this.products = this.shoppingCartService.getProducts();
  }

  removeItemFromShoppingCart(index: number){
    this.shoppingCartService.removeProduct(index);
  }
}
