import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { ProductService } from '../_services/product.service';
import { UserService } from '../_services/user.service';

@Injectable()
export class UserDetailsForProductResolver implements Resolve<User>{
   
    constructor(private userService: UserService, private productService: ProductService, private router: Router, private alertify: AlertifyService){}
   
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        var product = this.productService.getProduct(route.params['id']).pipe();
        return this.userService.getMember(product['sellerName']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving seller data');
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}