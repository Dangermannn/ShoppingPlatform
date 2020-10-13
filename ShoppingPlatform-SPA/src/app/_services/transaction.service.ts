import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Transaction } from '../_models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTransactions(){
    return this.http.get<Transaction[]>(this.baseUrl + 'transactions');
  }

  getTransactionsOfUser(name: string){
    return this.http.get<Transaction[]>(this.baseUrl + 'transactions/' + name);
  }

  getTransactionsSoldByUser(name: string){
    return this.http.get<Transaction[]>(this.baseUrl + 'transactions/' + name + '/sold');
  }

  getTransactionsBoughtByUser(name: string){
    return this.http.get<Transaction[]>(this.baseUrl + 'transactions/' + name + '/bought');
  }
}
