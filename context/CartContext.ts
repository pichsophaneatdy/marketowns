import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
// Product Interface
import { CartProduct } from '@/interface/product';

// Cart Context Type
interface CartContextType {
    cart: CartProduct[];
    addToCart: (product: CartProduct) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    decreaseQuantity: (productId: string) => void;
}
const useCartState = create<CartContextType>()(
    devtools(
        persist(
            (set) => ({
                cart: [],
                addToCart: (product: CartProduct) => set((state) => ({ cart: [...state.cart, product] })),
                removeFromCart: (productId: string) =>
                    set((state) => ({ cart: state.cart.filter((item) => item.product_id !== productId) })),
                clearCart: () => set({ cart: [] }), 
                decreaseQuantity: (productId: string) => set((state) => {
                    const indexToRemove = state.cart.findIndex((product) => product.product_id === productId);
                    if (indexToRemove !== -1) {
                        const updatedProducts = [...state.cart];
                        updatedProducts.splice(indexToRemove, 1); // Remove one item at the found index
                        return {cart: updatedProducts};
                    }
                    return state;
                })
            }),
            { name: 'cart-store' }
        )
    )
)

export default useCartState
