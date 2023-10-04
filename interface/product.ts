export interface Product {
    quantity?: number;
    category_id: number,
    color: string, 
    condition: string, 
    date: string, 
    desc: string, 
    images: string[],
    name: string, 
    price: string, 
    product_id: string, 
    seller_id: string, 
    size: string,
}
export interface CartProduct extends Product {
    quantity?: number
}