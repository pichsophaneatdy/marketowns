import React from 'react'
import useCartState from '@/context/CartContext';
import SingleCart from '@/component/SingleCart/SingleCart';
import { Flex, Text, Button} from '@chakra-ui/react';
import { Product, CartProduct } from '@/interface/product';

const CartPage = () => {
  const {cart, clearCart} = useCartState();
  const productIds: string[] = []
  const groupCart: CartProduct[] = []
  cart.map((product) => {
    if(productIds.includes(product.product_id)) {
      groupCart.forEach((item) => {
        if(item.product_id === product.product_id) {
          item?.quantity && item.quantity++
        }
      })
    } else {
      productIds.push(product.product_id)
      product.quantity = 1
      groupCart.push(product)
    }
  })
  console.log(groupCart)
  return (
    <Flex flexDirection={{base: 'column', md: "row"}} py={{base: 6, md:8}} px={{base: 4, md: "5%", lg: "10%"}} >
        <Flex flexDirection={'column'} gap={6} flexGrow={1}>
          {cart.length > 0 && cart.map((product) => <SingleCart product={product} key={product.product_id} />)}
        </Flex>
        <Flex flexDirection={'column'} w={{md: "40%"}}>
          <Button onClick={()=>clearCart()} >Clear cart</Button>
          <Text>Total</Text>
        </Flex>
    </Flex>
    
  )
}

export default CartPage