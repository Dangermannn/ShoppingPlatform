import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeView, TreeViewModule } from '@syncfusion/ej2-angular-navigations'
import { ProductListComponent } from './mainPage/product-list/product-list.component';
import { ProductCardComponent } from './mainPage/product-card/product-card.component';
import { CategoriesComponent } from './mainPage/categories/categories.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomePageComponent } from './mainPage/home-page/home-page.component';
import { ProductDetailsComponent } from './mainPage/product-details/product-details.component';
import { ProductDetailsResolver } from './_resolvers/product-details.resolver';

@NgModule({   
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    ProductCardComponent,
    CategoriesComponent,
    RegistrationComponent,
    HomePageComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule,
    TreeViewModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [ProductDetailsResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
