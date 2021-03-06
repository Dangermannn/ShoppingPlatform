import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../_models/product';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  products: Product[];

  constructor(private alertify: AlertifyService) { }


  addProduct(product: Product){
    this.products = JSON.parse(localStorage.getItem('shopping-cart'));
    if(this.products == null)
      this.products = [];
    this.products.push(product);
    this.updateShoppingCart();
  }

  removeProduct(index: number){
    this.products.splice(index, 1);
    this.updateShoppingCart();
    this.alertify.success('Product has ben removed from shopping-cart');
  }

  getProductIndex(product: Product){
    for(let i = 0; i < this.products.length; i++)
      if(JSON.stringify(product) === JSON.stringify(this.products[i]))
        return i;
    return -1;
  }

  getProducts(): Product[]{
    this.products = JSON.parse(localStorage.getItem('shopping-cart'));
    return this.products;
  }

  updateShoppingCart(){
    localStorage.removeItem('shopping-cart');
    localStorage.setItem('shopping-cart', JSON.stringify(this.products));
  }

  clearShoppingCart(){
    localStorage.removeItem('shopping-cart');
  }
}
