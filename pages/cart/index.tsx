import React from 'react'
import useCartState from '@/context/CartContext';
import SingleCart from '@/component/SingleCart/SingleCart';
import { Flex, Text} from '@chakra-ui/react';
import { Product, CartProduct } from '@/interface/product';

const CartPage = () => {
  const cart = useCartState((state) => state.cart);
  return (
    <Flex flexDirection={{base: 'column', md: "row"}} py={{base: 6, md:8}} px={{base: 4, md: "5%", lg: "10%"}} >
        <Flex flexDirection={'column'} gap={6} flexGrow={1}>
          {cart && cart.map((product) => <SingleCart product={product} key={product.product_id} />)}
        </Flex>
        <Flex flexDirection={'column'} w={{md: "40%"}}>
          <Text>Total</Text>
        </Flex>
    </Flex>
    
  )
}

export default CartPage