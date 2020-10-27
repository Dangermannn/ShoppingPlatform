import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../_models/transaction';
import { AccountService } from '../_services/account.service';
import { AlertifyService } from '../_services/alertify.service';
import { TransactionService } from '../_services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[];
  currentUsername: string;
  constructor(private accountService: AccountService, private transactionService: TransactionService,
     private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.transactions = data['transactions'];
    });
    var decodedToken = this.accountService.getDecodedToken(localStorage.getItem('user'));
    this.currentUsername = decodedToken.nameid;
  }

  // It's for 'removing'. It makes transaction not visible for the user.
  updateTransaction(transaction: Transaction){
    this.transactionService.updateTransaction(transaction.id, this.currentUsername).subscribe(data => {
      const index = this.transactions.indexOf(data, 0);
      this.transactions.splice(index, 1);
      this.alertify.success('Transaction has been removed successfully!');
    }, error => {
      this.alertify.error('Error while removing a transaction');
    });
  }
}
