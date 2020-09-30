import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loginModel: any = {}
  loggedIn = false;
  navbarOpened = false;
  constructor(private accountService: AccountService, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  togglerNavbar(){
    this.navbarOpened = !this.navbarOpened;
  }

  login(){
    this.accountService.login(this.loginModel).subscribe(response => {
      this.alertify.success("Successfully logged in!");
      this.loggedIn = true;
    }, error => {
      this.alertify.error("Given login or password are incorrect!");
    });
  }

  logout(){
    this.loggedIn = false;
  }
}
