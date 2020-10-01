import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loginModel: any = {}
  navbarOpened = false;

  constructor(public accountService: AccountService, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  togglerNavbar(){
    this.navbarOpened = !this.navbarOpened;
  }

  login(){
    this.accountService.login(this.loginModel).subscribe(response => {
      this.alertify.success("Successfully logged in!");
    }, error => {
      this.alertify.error("Given login or password are incorrect!");
    });
  }

  logout(){
    this.accountService.logout();
  }
}
