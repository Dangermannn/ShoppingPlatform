import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_models/product';
import { AlertifyService } from '../_services/alertify.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})
export class UserProductsComponent implements OnInit {
  myProducts: Product[];
  mySoldProducts: Product[];

  constructor(private route: ActivatedRoute, private productService: ProductService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.myProducts = data['myProducts'];
    });
    this.route.data.subscribe(data => {
      this.mySoldProducts = data['mySoldProducts'];
    });
  }


    removeProduct(product: Product): void{
      this.productService.removeProduct(product.id).subscribe(data => {
        const index = this.myProducts.indexOf(product);
        if(index != -1){
          this.myProducts.splice(index, 1);
        }
        this.alertify.success('Product has been removed');
      }, error => {
        this.alertify.error('Error occured while removing a product');
      });
    }
}
