import { Component, Input, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductService } from 'src/app/_services/product.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  seller: User;

  constructor(private userService: UserService, private productService: ProductService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.product = data['product'];
    });
    console.log("BEFORE");
    //this.getSeller(this.product.sellerName);
    console.log("AFTER");
  }


}
