import { createContext } from "react";

interface Product {
    category_id: number;
    color: string;
    condition: string;
    date: string;
    desc: string;
    images: string[];
    name: string;
    price: string;
    product_id: string;
    seller_id: string;
    size: string;
}

// Define the cart context
interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {}
});

