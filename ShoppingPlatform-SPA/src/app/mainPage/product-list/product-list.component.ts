import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  
  constructor(private productService: ProductService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.loadMembers();
    console.log('constructor');
  }

  loadMembers(){
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });

    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log("LOADED PRODuCTS");
      console.log("LOADED: " + this.products);
      console.log("ON PIPE: " + products);
    }, error => {
      this.alertify.error("Failed to load products");
    });
  }
}
