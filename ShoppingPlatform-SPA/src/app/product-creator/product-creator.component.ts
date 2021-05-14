import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { decode } from 'punycode';
import { Category } from '../_models/category';
import { Product } from '../_models/product';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { AlertifyService } from '../_services/alertify.service';
import { ProductService } from '../_services/product.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-product-creator',
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.css']
})
export class ProductCreatorComponent implements OnInit {
  productModel: any;
  productForm: FormGroup;
  categories: Category[];
  constructor(private productService: ProductService, private accountService: AccountService,
     private alertify: AlertifyService, private userService: UserService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productService.getCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      this.alertify.error("Error while loading categories");
    });
    this.createProductForm();
  }

  addProduct(): void{
    let decodedToken = this.accountService.getDecodedToken(localStorage.getItem('user'));
    this.productModel = Object.assign({}, this.productForm.value);
    var obj = {
      "title": this.productModel.title,
      "description": this.productModel.description,
      "categoryName": this.productModel.categoryName,
      "city":this.productModel.city,
      "price": +this.productModel.price,
      "sellerName": decodedToken.unique_name
  };
    this.productService.addProduct(obj).subscribe(data => {
      this.alertify.success("Product has been added successfully!");
      this.router.navigate(['users/transactions/' + decodedToken.unique_name]);
    }, error => {
      this.alertify.error(error);
    });
  }

  createProductForm(): void{
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      categoryName: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
      price: ['', Validators.required]
    }, {validators: this.isNumberValidator});
  }

  isNumberValidator(fg: FormGroup){
    //return fg.get('price').value === fg.get('title').value ? null : {'not-number': true};
    return !isNaN(Number(fg.get("price").value)) ? null : {'not-number': true};
  }
}
