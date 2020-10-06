import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[];

  constructor(private productService: ProductService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  loadMembers(){
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    }, error => {
      this.alertify.error("Failed to load products");
    });
  }
}
