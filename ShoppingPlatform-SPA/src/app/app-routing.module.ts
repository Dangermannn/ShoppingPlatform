import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './mainPage/home-page/home-page.component';
import { ProductDetailsComponent } from './mainPage/product-details/product-details.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductDetailsResolver } from './_resolvers/product-details.resolver';
import { UserDetailsForProductResolver } from './_resolvers/user-details-for-product.resolver';


const routes: Routes = [
  {path: '', component: HomePageComponent },
  {path: 'register', component: RegistrationComponent},
  {path: 'products/:id', component: ProductDetailsComponent, resolve: {product: ProductDetailsResolver}},
  {path: '**', component: AppComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
