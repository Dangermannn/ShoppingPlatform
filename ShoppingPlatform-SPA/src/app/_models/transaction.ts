import { Product } from './product';
import { User } from './user';

export interface Transaction{
    id: number;
    initialized: Date;
    buyer: User;
    price: number;
    products: Product[];
}