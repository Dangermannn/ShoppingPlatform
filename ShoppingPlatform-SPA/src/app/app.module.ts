import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { CollapseModule } from '../../node_modules/ngx-bootstrap/collapse'  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './mainPage/product-list/product-list.component';
import { ProductCardComponent } from './mainPage/product-card/product-card.component';

@NgModule({   
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule,
    FormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
