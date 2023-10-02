// import create from 'zustand';

// const useCartStore = create((set) => ({
    // cart: [],
    // addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
    // removeFromCart: (productId) =>
    //     set((state) => ({ cart: state.cart.filter((item) => item.product_id !== productId) })),
    // clearCart: () => set({ cart: [] }),
// }));

// export default useCartStore;


import { Action } from 'aws-sdk/clients/appstream';
import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'

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
// Cart Context Type
interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}
const useCartState = create<CartContextType>()(
    devtools(
        persist(
            (set) => ({
                cart: [],
                addToCart: (product: Product) => set((state) => ({ cart: [...state.cart, product] })),
                removeFromCart: (productId: string) =>
                    set((state) => ({ cart: state.cart.filter((item) => item.product_id !== productId) })),
                clearCart: () => set({ cart: [] }), // Implement clearCart action
            }),
            { name: 'cart-store' }
        )
    )
)

export default useCartState
