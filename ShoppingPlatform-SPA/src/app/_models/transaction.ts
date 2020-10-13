import { Product } from './product';
import { User } from './user';

export interface Transaction{
    id: number;
    initialized: Date;
    seller: User;
    buyer: User;
    price: number;
    products: Product[];
}