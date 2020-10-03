import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/_models/category';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-categories',
  //templateUrl: './categories.component.html',
  template: `<div id='treeparent'><ejs-treeview id='treeelement' [fields]='field'></ejs-treeview></div>`,
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  field: Object;
  constructor(private productService: ProductService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(){
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.cleanCategoriesData();
      this.field = { dataSource: this.categories, id: 'id', parentID: 'parentCategoryId', text: 'name', hasChildren: 'hasChild' }
    }, error => {
      this.alertify.error("Failed to load categories");
    });
  }

  cleanCategoriesData(){
    this.categories.forEach(category => {
      if(category.parentCategoryId == null)
        delete category.parentCategoryId;
      if(category.hasChild == false)
        delete category.hasChild;
    });
  }
}
