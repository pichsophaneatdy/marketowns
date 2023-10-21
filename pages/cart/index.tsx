import React, {useState, useEffect} from 'react'
import useCartState from '@/context/CartContext';
import SingleCart from '@/component/SingleCart/SingleCart';
import { Flex, Text, Button} from '@chakra-ui/react';
import { Product, CartProduct } from '@/interface/product';
import { v4 as uuidv4 } from 'uuid';
// Component
import Checkout from '@/component/Checkout/Checkout';
// Cognito
import { getCurrentUser } from '@/functions/awsCognito';

const CartPage = () => {

  // Checkout State
  const [name, setName] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [apt, setApt] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [zipCode, setZipCode] = useState<string>("")
  const [country, setCountry] = useState<string>("")
  const [Subtotal, setSubtotal] = useState<number>(0)
  const [payment, setPayment] = useState<string>("")

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
  // Calculate Sub total
  useEffect(() => {
    if(groupCart.length > 0) {
      let Subtotal = 0;
      groupCart.map((product) => {
        Subtotal += (product.quantity || 1) * Number(product.price)
      })
      setSubtotal(Subtotal)
    }
  }, [cart, groupCart])

  // Handle Submit
  const handleCheckout = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const currentUser = await getCurrentUser();
      const productsArray = cart.map((product) => product.product_id);
      const newProduct= {
        order_id: uuidv4(),
        user_id: currentUser.username,
        date: new Date().getTime(),
        subtotal: Subtotal,
        total: Subtotal*1.05,
        fullName: name,
        address: address,
        apt: apt,
        city: city,
        zipCode: zipCode,
        country: country,
        payment: "Pay at delivery",
        products: productsArray
      }
      console.log(newProduct)
    } catch(err){
      console.log(err)
    }
    
  }
  return (
    <Flex alignItems={"start"} bg={"gray.50"} gap={{md: "2rem"}} flexDirection={{base: 'column', lg: "row"}} py={{base: 6, md:8}} px={{base: 4, md: "5%"}} >
        <Flex flexDirection={"column"} width={{base: "100%",xl: "60%"}}>
          <Flex p={4} bg={"white"} flexDirection={'column'} flexGrow={1} gap={6}>
            {groupCart.length > 0 ? groupCart.map((product) => <SingleCart product={product} key={product.product_id} />) : <Text>No item in your cart right now.</Text>}
          </Flex>
          <Flex gap={2} textAlign={"right"} flexDirection="column" mt={{base: 6, md: 8,lg: 10}}>
            <Text fontWeight={500}>Sub total: ${Subtotal} </Text>
            <Text color="gray.600">GST(5%): ${(Subtotal*0.05).toFixed(2)}</Text>
            <Text fontWeight={600} fontSize={"2xl"}>Total: ${(Subtotal*1.05).toFixed(2)} </Text>
          </Flex>
          <Flex justifyContent={"end"} gap={4}>
            <Button w="200px" mt={4} onClick={()=>clearCart()} >Clear cart</Button>
          </Flex>
        </Flex>
        {/* Checkout section */}
        <Checkout
          name={name}
          setName={setName}
          address={address}
          setAddress={setAddress}
          apt={apt}
          setApt={setApt}
          city={city}
          setCity={setCity}
          country={country}
          setCountry={setCountry}
          payment={payment}
          setPayment={setPayment}
          zipCode={zipCode}
          setZipCode={setZipCode}
          handleCheckout={handleCheckout}
        />
    </Flex>
    
  )
}

export default CartPage