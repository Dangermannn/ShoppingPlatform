import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './mainPage/home-page/home-page.component';
import { ProductDetailsComponent } from './mainPage/product-details/product-details.component';
import { RegistrationComponent } from './registration/registration.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ProductDetailsResolver } from './_resolvers/product-details.resolver';
import { ProductListByCategoryResolver } from './_resolvers/product-list-by-category.resolver';
import { UserEditResolver } from './_resolvers/user-edit.resolver';


const routes: Routes = [
  {path: '', component: HomePageComponent, resolve: {products: ProductListByCategoryResolver} },
  {path: 'users/accountSettings/:name', component: AccountSettingsComponent, resolve: {user: UserEditResolver}},
  {path: 'users/transactions/:name', component: TransactionsComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'products/:id', component: ProductDetailsComponent, resolve: {product: ProductDetailsResolver}},
  {path: 'products/category/:category', component: HomePageComponent, resolve: {products: ProductListByCategoryResolver}},
  {path: '**', component: AppComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
