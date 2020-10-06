import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';
import { Product } from '../_models/product';
import { AlertifyService } from '../_services/alertify.service';
import { ProductService } from '../_services/product.service';

@Injectable()
export class ProductListByCategoryResolver implements Resolve<Product[]>{

    constructor(private productService: ProductService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]>  {
        var params = route.params['category'];
        if(params == null)
            return this.productService.getProducts().pipe(
                catchError(error => {
                    this.alertify.error('Problem retrieving data: ALL');
                    return of(null);
                } )
            );
        return this.productService.getProductsByCategory(route.params['category']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                return of(null);
            })
        );
    }

}