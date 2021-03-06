import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './mainPage/home-page/home-page.component';
import { ProductDetailsArchComponent } from './mainPage/product-details-arch/product-details-arch.component';
import { ProductDetailsComponent } from './mainPage/product-details/product-details.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ProductCreatorComponent } from './product-creator/product-creator.component';
import { RegistrationComponent } from './registration/registration.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { TransactionsDetailsComponent } from './transactions-details/transactions-details.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserProductsComponent } from './user-products/user-products.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { AllTransactionsResolver } from './_resolvers/all-transactions.resolver';
import { ProductDetailsArchResolver } from './_resolvers/product-details-arch.resolver';
import { ProductDetailsResolver } from './_resolvers/product-details.resolver';
import { ProductListByCategoryResolver } from './_resolvers/product-list-by-category.resolver';
import { ShoppingCartResolver } from './_resolvers/shopping-cart.resolver';
import { TransactionDetailsResolver } from './_resolvers/transaction-details.resolver';
import { TransactionListResolver } from './_resolvers/transaction-list.resolver';
import { UserArchiveProductsResolver } from './_resolvers/user-archive-products.resolver';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { UserProductsResolver } from './_resolvers/user-products.resolver';


const routes: Routes = [
  {path: '', component: HomePageComponent, resolve: {products: ProductListByCategoryResolver} },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'users/shoppingCart', component: ShoppingCartComponent, resolve: {products: ShoppingCartResolver}},
      {path: 'users/accountSettings/:name', component: AccountSettingsComponent, resolve: {user: UserEditResolver}},
      {path: 'users/transactions/:name', component: TransactionsComponent, resolve: {transactions: TransactionListResolver}},
      {path: 'users/transactions/:name/:id', component: TransactionsDetailsComponent, resolve: {transaction: TransactionDetailsResolver}},
      {path: 'products/create', component: ProductCreatorComponent}, 
      {path: 'order-summary', component: OrderSummaryComponent, resolve: {products: ShoppingCartResolver}},
      {path: 'users/my-products/:name', component: UserProductsComponent, resolve: {myProducts: UserProductsResolver, mySoldProducts: UserArchiveProductsResolver}},
      {path: 'admin-panel', component: AdminPanelComponent, resolve: {transactions: AllTransactionsResolver}, canActivate: [AdminGuard]}
    ]
  },
  {path: 'register', component: RegistrationComponent},
  {path: 'products/:id', component: ProductDetailsComponent, resolve: {product: ProductDetailsResolver}},
  {path: 'products/category/:category', component: HomePageComponent, resolve: {products: ProductListByCategoryResolver}},
  {path: 'products/archive/:id', component: ProductDetailsArchComponent, resolve: {product: ProductDetailsArchResolver}},
  {path: '**', component: AppComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
