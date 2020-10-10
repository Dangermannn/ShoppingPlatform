import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { ProductService } from '../_services/product.service';
import { UserService } from '../_services/user.service';

@Injectable()
export class UserEditResolver implements Resolve<User>{
   
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService){}
   
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.userService.getMember(route.params['name']).pipe(
            catchError(error => {
                this.alertify.error('Problem with retrieving user data');
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}