import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getMember(name: string){
    return this.http.get<User>(this.baseUrl + 'users/' + name);
  }

  updateMember(user: User, name: string){
    return this.http.put<User>(this.baseUrl + 'users/' + name, user);
  }
}
