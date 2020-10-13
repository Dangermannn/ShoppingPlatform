import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../_models/transaction';
import { AccountService } from '../_services/account.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[];
  currentUsername: string;
  constructor(private accountService: AccountService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.transactions = data['transactions'];
    });
    var decodedToken = this.accountService.getDecodedToken(localStorage.getItem('user'));
    this.currentUsername = decodedToken.nameid;
  }
}
