import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NodeClickEventArgs, NodeKeyPressEventArgs, TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { stringify } from 'querystring';
import { Category } from 'src/app/_models/category';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-categories',
  //templateUrl: './categories.component.html',
  template: `<div id='treeparent'><ejs-treeview id='treeelement' #treevalidate (nodeClicked)='nodeCheck($event)' [fields]='field'></ejs-treeview></div>`,
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Output() refreshProductEvent = new EventEmitter();
  @Output() categoryToShow: string;

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

  refreshProducts(category: string){
    this.refreshProductEvent.emit(category);
  }

  @ViewChild ('treevalidate') treevalidate: TreeViewComponent;

  public nodeCheck(args: NodeKeyPressEventArgs | NodeClickEventArgs): void {
    var selectedNode = this.treevalidate.selectedNodes;
    if(selectedNode == null)
      return;
    var v = this.treevalidate.getTreeData(selectedNode[0]);
    if(v[0].hasOwnProperty('hasChild'))
      return;
    this.refreshProductEvent.emit((Object.values(v[0]))[1].toString());
  }

}
