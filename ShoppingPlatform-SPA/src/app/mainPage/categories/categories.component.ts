import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_models/category';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];

  constructor(private productService: ProductService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(){
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    }, error => {
      this.alertify.error("Failed to load categories");
    });
  };
}
