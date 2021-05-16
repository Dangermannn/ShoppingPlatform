import { Product } from "../_models/product";

export interface TransactionPostDto{
    buyerId: number;
    products: Product[];
}