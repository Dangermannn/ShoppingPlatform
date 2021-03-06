import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
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
import { ProductListByCategoryResolver } from './_resolvers/product-list-by-category.resolver';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionListResolver } from './_resolvers/transaction-list.resolver';
import { TransactionsDetailsComponent } from './transactions-details/transactions-details.component';
import { TransactionDetailsResolver } from './_resolvers/transaction-details.resolver';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartResolver } from './_resolvers/shopping-cart.resolver';
import { ProductCreatorComponent } from './product-creator/product-creator.component';
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ProductDetailsArchComponent } from './mainPage/product-details-arch/product-details-arch.component';
import { ProductDetailsArchResolver } from './_resolvers/product-details-arch.resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserProductsComponent } from './user-products/user-products.component';
import { UserProductsResolver } from './_resolvers/user-products.resolver';
import { UserArchiveProductsResolver } from './_resolvers/user-archive-products.resolver';
import { AllTransactionsResolver } from './_resolvers/all-transactions.resolver';

@NgModule({   
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    ProductCardComponent,
    CategoriesComponent,
    RegistrationComponent,
    HomePageComponent,
    ProductDetailsComponent,
    AccountSettingsComponent,
    TransactionsComponent,
    TransactionsDetailsComponent,
    ShoppingCartComponent,
    ProductCreatorComponent,
    OrderSummaryComponent,
    ProductDetailsArchComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserProductsComponent,
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
  providers: [
    ProductDetailsResolver,
    ProductListByCategoryResolver,
    UserEditResolver,
    TransactionListResolver,
    TransactionDetailsResolver,
    ShoppingCartResolver,
    UserProductsResolver,
    UserArchiveProductsResolver,
    AllTransactionsResolver,
    ProductDetailsArchResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
