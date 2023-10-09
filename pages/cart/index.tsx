import React, {useState, useEffect} from 'react'
import useCartState from '@/context/CartContext';
import SingleCart from '@/component/SingleCart/SingleCart';
import { Flex, Text, Button} from '@chakra-ui/react';
import { Product, CartProduct } from '@/interface/product';

const CartPage = () => {
  const [total, setTotal] = useState<number>(0);

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
  // Calculate total
  useEffect(() => {
    if(groupCart.length > 0) {
      let total = 0;
      groupCart.map((product) => {
        total += (product.quantity || 1) * Number(product.price)
      })
      setTotal(total)
    }
  }, [cart, groupCart])
  return (
    <Flex gap={{md: "2rem"}} flexDirection={{base: 'column', md: "row"}} py={{base: 6, md:8}} px={{base: 4, md: "5%", lg: "10%"}} >
        <Flex flexDirection={'column'} gap={6} flexGrow={1}>
          {groupCart.length > 0 ? groupCart.map((product) => <SingleCart product={product} key={product.product_id} />) : <Text>No item in your cart right now.</Text>}
        </Flex>
        <Flex mt={{base: 10,md: 0}} flexDirection={'column'} w={{md: "40%"}}>
          <Text fontWeight={600} fontSize={"2xl"}>Total: ${total} </Text>
          <Flex gap={4}>
            <Button w="full" mt={4} onClick={()=>clearCart()} >Clear cart</Button>
            <Button w="full" mt={4} colorScheme='green' onClick={()=>clearCart()} >Checkout</Button>
          </Flex>
        </Flex>
    </Flex>
    
  )
}

export default CartPage