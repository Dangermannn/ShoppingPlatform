import { Injectable } from '@angular/core';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  products: Product[];
  
  constructor() { }

  addProduct(product: Product){
    this.products.push(product);
  }
}
