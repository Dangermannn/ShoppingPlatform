import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeView, TreeViewModule } from '@syncfusion/ej2-angular-navigations'
import { ProductListComponent } from './mainPage/product-list/product-list.component';
import { ProductCardComponent } from './mainPage/product-card/product-card.component';
import { CategoriesComponent } from './mainPage/categories/categories.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({   
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    ProductCardComponent,
    CategoriesComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule,
    TreeViewModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
