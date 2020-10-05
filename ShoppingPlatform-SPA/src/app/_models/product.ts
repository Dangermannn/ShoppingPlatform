import { DecimalPipe } from '@angular/common';
import { Category } from './category';
import { User } from './user';

export interface Product{
    id: number;
    title: string;
    description: string;
    categoryName: string;
    price: number;
    seller: User;
    addedDate: Date;
}