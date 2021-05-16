import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { User } from 'src/app/_models/user';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-details-arch',
  templateUrl: './product-details-arch.component.html',
  styleUrls: ['./product-details-arch.component.css']
})
export class ProductDetailsArchComponent implements OnInit {
  product: Product;
  seller: User;
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.product = data['product'];
    });
  }

}
