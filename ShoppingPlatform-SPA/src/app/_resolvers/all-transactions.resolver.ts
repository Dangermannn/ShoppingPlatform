import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';
import { Product } from '../_models/product';
import { Transaction } from "../_models/transaction";
import { AlertifyService } from '../_services/alertify.service';
import { ProductService } from '../_services/product.service';
import { TransactionService } from '../_services/transaction.service';

@Injectable()
export class AllTransactionsResolver implements Resolve<Transaction[]>{

    constructor(private transactionService: TransactionService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Transaction[]>  {
        return this.transactionService.getAllTransactions().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }

}