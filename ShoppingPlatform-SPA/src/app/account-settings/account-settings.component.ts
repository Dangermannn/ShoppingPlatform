import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private accountService: AccountService,
    private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    })
  }

  updateUser(): void{
    var decodedToken = this.accountService.getDecodedToken(localStorage.getItem('user'));
    this.userService.updateMember(this.user, decodedToken.unique_name).subscribe(data => {
      this.alertify.success('Profile has been updated!');
    }, error => {
      this.alertify.error('Error occured while removing a transaction!');
    });
  }
}
