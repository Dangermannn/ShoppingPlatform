import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  getProductsByCategory(category: string){
    return this.http.get<Product[]>(this.baseUrl + 'products/category/' + category);
  }

  getProduct(id: number){
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getCategories(){
    return this.http.get<Category[]>(this.baseUrl + 'products/categories');
  }
}
