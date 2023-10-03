import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
// Product Interface
import { Product } from '@/interface/product';

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
