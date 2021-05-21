import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionPostDto } from '../_dtos/transactionPostDto';
import { Product } from '../_models/product';
import { Transaction } from '../_models/transaction';
import { AccountService } from '../_services/account.service';
import { AlertifyService } from '../_services/alertify.service';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { TransactionService } from '../_services/transaction.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  products: Product[];
  overallPrice: number = 0;
  constructor(private route: ActivatedRoute, private accountService: AccountService,
    private transactionService: TransactionService, private alertify: AlertifyService,
    private shoppingCartService: ShoppingCartService, private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.products = data['products'];
    });
    this.products.forEach(product => {
      this.overallPrice += product.price;
    });
    
  }

  processTransaction(): void{
    const decodedToken = this.accountService.getDecodedToken(localStorage.getItem('user'));
    
    const transaction: TransactionPostDto = {
      "buyerId": +decodedToken.nameid,
      "products": this.products
    }

    this.transactionService.postTransaction(transaction).subscribe(data => {
      this.alertify.success("Transaction has been initialized");
      this.shoppingCartService.clearShoppingCart();
      this.router.navigate(['users/transactions/' + decodedToken.unique_name]);
    }, error => {
      this.alertify.error(error);
    });
  }

} 
