import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { AccountService } from 'src/app/_services/account.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(private productService: ProductService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct(this.route.snapshot.params['id']);
  }

  loadProduct(id: number){
    this.productService.getProduct(id).subscribe(result => {
      this.product = result;
    }, error => {
      this.alertify.error("Cannot load a product");
    });
  }
}
