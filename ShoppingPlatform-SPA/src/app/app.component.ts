import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ShoppingPlatform-SPA';
  baseUrl = environment.apiUrl;
  users: any;
  constructor(private http: HttpClient, private accountService: AccountService){}

  ngOnInit(): void {
    console.log("URL: " + this.baseUrl);
    //this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  getUsers(){
    this.http.get(this.baseUrl + 'users').subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    });
  }
}
