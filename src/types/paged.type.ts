export interface Paged<T> {
    products: T[];
    total: number;
    skip: number;
    limit: number;
}