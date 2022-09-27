export type Uuid = string;

export interface Product {
    _id: Uuid,
    date: Date
    title: string,
    price: number,
    description: string,
    code: string,
    image: string,
    stock: number
}