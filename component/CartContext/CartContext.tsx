import React, {useState, ReactNode, createContext, useContext} from 'react'

// Product Interface
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

// Define the cart context interface
interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}
// Create card context
export const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {}
});


interface CartProviderProps {
    children: ReactNode;
}

// Provider Function
export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (productId: string) => {
        setCart(cart.filter((item: Product) => item.product_id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    
    )
}

export function useCart() {
    return useContext(CartContext)
}