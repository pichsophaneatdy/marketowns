import React from 'react'
import useCartState from '@/context/cartContext'

const CartPage = () => {
  const cart = useCartState((state) => state.cart);
  return (
    <div>
      {cart && cart.map((product) => <p key={product.product_id}>{product.name}</p>)}
    </div>
  )
}
export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default CartPage