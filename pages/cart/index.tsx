import React, {useState, useEffect} from 'react'
import useCartState from '@/context/CartContext';
import SingleCart from '@/component/SingleCart/SingleCart';
import { Flex, Text, Button, Spinner, AlertTitle, AlertDescription, Alert, AlertIcon} from '@chakra-ui/react';
import { Product, CartProduct } from '@/interface/product';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
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

  // Checkout status
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [formError, setFormError] = useState<string>("")

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
  // Clear formError when user starts typing
  useEffect(() => {
    setFormError("")
  }, [name, address, apt, city, zipCode, country])

  // Handle Submit
  const handleCheckout = async(e: React.FormEvent) => {
    e.preventDefault();
    // Checking for missing required fields
    if(!name || !address || !apt || !city || !zipCode || !country) {
      setFormError("Missing required field(s)!");
      return;
    }

    try {
      setIsLoading(true)
      const currentUser = await getCurrentUser();
      const productsArray = cart.map((product) => product.product_id);
      const newOrder= {
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
      await axios.post(process.env.NEXT_PUBLIC_API_2!, newOrder, {
        headers: {
          Authorization: currentUser.idToken
      }
      })
    } catch(err){
      setError(true)
    } finally {
      setIsLoading(true)
    }
    
  }
  // Loading
  if(isLoading) {
    return (
      <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
        <Spinner
          mt={8}
          mb={4}
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='green.500'
          size='xl'
        />
        <Text fontWeight={500} color={"green.500"}>Submmiting your order</Text>
      </Flex>
    )
  }
  // Error occur
  if(error) {
    return (
      <Alert
        maxW={"500px"}
        w="90%"
        borderRadius={6}
        mx={"auto"}
        my={4}
        status='error'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='200px'
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='md'>
          There is an error processing your order.
        </AlertTitle>
        <AlertDescription maxWidth='sm'>
          PLease try again later. Sorry for the inconvenience.
        </AlertDescription>
        <Text fontSize={"sm"} mt={4} fontWeight={600} color={"blue.500"} as="a" href="/" >Go back home</Text>
      </Alert>
    )
  }
  // Success 
  if(success) {
    return (
      <Alert
        maxW={"500px"}
        w="90%"
        borderRadius={6}
        mx={"auto"}
        my={4}
        status='success'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='200px'
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='md'>
          Submitted your order
        </AlertTitle>
        <AlertDescription maxWidth='sm'>
          Thanks for using Marketowns Platform.
        </AlertDescription>
        <Text fontSize={"sm"} mt={4} fontWeight={600} color={"blue.500"} as="a" href="/" >Go back home</Text>
      </Alert>
    )
  }
  return (
    <Flex alignItems={"start"} bg={"gray.50"} gap={{md: "2rem"}} flexDirection={{base: 'column', lg: "row"}} py={{base: 6, md:8}} px={{base: 4, md: "5%"}} >
        {/* Cart Products, Subtotal, and Total */}
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
          error={formError}
        />
    </Flex>
    
  )
}

export default CartPage