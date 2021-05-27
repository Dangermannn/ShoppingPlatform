import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TransactionPostDto } from '../_dtos/transactionPostDto';
import { Transaction } from '../_models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllTransactions(){
    return this.http.get<Transaction[]>(this.baseUrl + 'transactions/all-transactions');
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
  
  getTransactionById(id: number, name: string){
    return this.http.get<Transaction>(this.baseUrl + 'transactions/' + name + '/' + id);
  }

  updateTransaction(id: number, name: string){
    return this.http.put<Transaction>(this.baseUrl + 'transactions/' + name + '/' + id, {});
  }

  postTransaction(transaction: TransactionPostDto){
    return this.http.post<TransactionPostDto>(this.baseUrl + 'transactions', transaction);
  }
}
