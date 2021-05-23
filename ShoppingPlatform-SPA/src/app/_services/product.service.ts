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

  getUserProducts(username: string){
    return this.http.get<Product[]>(this.baseUrl + 'products/my-products/' + username);
  }

  getCategories(){
    return this.http.get<Category[]>(this.baseUrl + 'products/categories');
  }

  addProduct(product: any){
    return this.http.post<any>(this.baseUrl + 'products', product);
  }

  removeProduct(id: number){
    return this.http.delete(this.baseUrl + 'products/' + id);
  }

  updateProduct(product: Product){
    return this.http.put<Product>(this.baseUrl + 'products', product);
  }

  getArchivedProduct(id: number){
    return this.http.get<Product>(this.baseUrl + 'products/archive/' + id);
  }

  getArchivedProducts(){
    return this.http.get<Product[]>(this.baseUrl + 'products/archive');
  }

  getUserArchivedProducts(username: string){
    return this.http.get<Product[]>(this.baseUrl + 'products/archive/my-products/' + username);
  }

}
