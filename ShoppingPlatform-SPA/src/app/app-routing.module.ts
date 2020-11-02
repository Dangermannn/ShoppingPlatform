import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './mainPage/home-page/home-page.component';
import { ProductDetailsComponent } from './mainPage/product-details/product-details.component';
import { RegistrationComponent } from './registration/registration.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { TransactionsDetailsComponent } from './transactions-details/transactions-details.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ProductDetailsResolver } from './_resolvers/product-details.resolver';
import { ProductListByCategoryResolver } from './_resolvers/product-list-by-category.resolver';
import { ShoppingCartResolver } from './_resolvers/shopping-cart.resolver';
import { TransactionDetailsResolver } from './_resolvers/transaction-details.resolver';
import { TransactionListResolver } from './_resolvers/transaction-list.resolver';
import { UserEditResolver } from './_resolvers/user-edit.resolver';


const routes: Routes = [
  {path: '', component: HomePageComponent, resolve: {products: ProductListByCategoryResolver} },
  {path: 'users/shoppingCart', component: ShoppingCartComponent, resolve: {products: ShoppingCartResolver}},
  {path: 'users/accountSettings/:name', component: AccountSettingsComponent, resolve: {user: UserEditResolver}},
  {path: 'users/transactions/:name', component: TransactionsComponent, resolve: {transactions: TransactionListResolver}},
  {path: 'users/transactions/:name/:id', component: TransactionsDetailsComponent, resolve: {transaction: TransactionDetailsResolver}},
  {path: 'register', component: RegistrationComponent},
  {path: 'products/:id', component: ProductDetailsComponent, resolve: {product: ProductDetailsResolver}},
  {path: 'products/category/:category', component: HomePageComponent, resolve: {products: ProductListByCategoryResolver}},
  {path: 'transactions', component: TransactionsComponent, resolve: {transactions: TransactionListResolver}},
  {path: '**', component: AppComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
