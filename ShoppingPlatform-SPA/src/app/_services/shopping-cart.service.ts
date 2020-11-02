import { Injectable } from '@angular/core';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  products: Product[] = [];
  
  constructor() { }

  addProduct(product: Product){
    this.products = JSON.parse(localStorage.getItem('shopping-cart'));
    if(this.products == null)
      this.products = [];
    this.products.push(product);
    localStorage.removeItem('shopping-cart');
    localStorage.setItem('shopping-cart', JSON.stringify(this.products));
  }

  getProducts(): Product[]{
    return JSON.parse(localStorage.getItem('shopping-cart'));
  }
}
