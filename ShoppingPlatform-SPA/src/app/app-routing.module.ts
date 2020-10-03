import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './mainPage/home-page/home-page.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  {path: '', component: HomePageComponent },
  {path: 'register', component: RegistrationComponent},
  {path: '**', component: AppComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
