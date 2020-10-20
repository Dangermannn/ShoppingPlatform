import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Transaction } from '../_models/transaction';
import { AlertifyService } from '../_services/alertify.service';
import { TransactionService } from '../_services/transaction.service';

@Injectable()
export class TransactionDetailsResolver implements Resolve<Transaction>{

    constructor(private transactionService: TransactionService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Transaction>  {
        return this.transactionService.getTransactionById(route.params['id'], route.params['name']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }

}