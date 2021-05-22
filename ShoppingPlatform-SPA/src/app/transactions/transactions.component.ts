import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  myOrders: Transaction[];
  orderedByOthers: Transaction[];

  currentUsername: string;
  constructor(private accountService: AccountService, private transactionService: TransactionService,
     private route: ActivatedRoute, private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
    let transactions: Transaction[] = [];
    this.route.data.subscribe(data => {
      transactions = data['transactions'];
    });
    var decodedToken = this.accountService.getDecodedToken(localStorage.getItem('user'));
    this.currentUsername = decodedToken.unique_name;

    this.myOrders = transactions.filter((t) => {
      return t.buyer.username === this.currentUsername;
    });

    this.orderedByOthers = transactions.filter((t) => {
      return t.buyer.username !== this.currentUsername;
    });
  }

  // It's for 'removing'. It makes transaction not visible for the user.
  updateTransaction(transaction: Transaction){
    this.transactionService.updateTransaction(transaction.id, this.currentUsername).subscribe(data => {
      let index = this.myOrders.indexOf(data, 0);
      if(index === -1){
        index = this.orderedByOthers.indexOf(data, 0);
        this.orderedByOthers.splice(index, 1);
      }else{
        this.myOrders.splice(index, 1);
      }
      this.alertify.success('Transaction has been removed successfully!');
    }, error => {
      this.alertify.error('Error while removing a transaction');
    });
  }

  goToProductCreation(){
    this.router.navigate(['products/create']);
  }
}
