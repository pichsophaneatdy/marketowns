import React from 'react'
import useCartState from '@/context/CartContext';
import SingleCart from '@/component/SingleCart/SingleCart';
import { VStack, Flex, Text} from '@chakra-ui/react';

const CartPage = () => {
  const cart = useCartState((state) => state.cart);
  return (
    <Flex flexDirection={{base: 'column', md: "row"}} py={{base: 6, md:8}} px={{base: 4, md: "5%", lg: "10%"}} >
        <VStack spacing={4} flexGrow={1}>
          {cart && cart.map((product) => <SingleCart key={product.product_id} />)}
        </VStack>
        <VStack w={{md: "40%"}}>
          <Text>Total</Text>
        </VStack>
    </Flex>
    
  )
}

export default CartPage