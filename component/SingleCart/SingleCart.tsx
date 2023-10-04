import React, {useEffect, useState} from 'react'
import {Card, Flex, Heading, CardBody, Image, Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, VStack } from '@chakra-ui/react'
import useCartState from '@/context/CartContext'

const SingleCart = ({product}: any)=> {

    const [image, setImage] = useState<number>(0);

    const handleNextImg = () => {
        if(image < 2) {
            setImage(image+1)
        }
    }
    const handlePrevImg = () => {
        if(image > 0) {
            setImage(image-1)
        }
    }

    const {cart, addToCart, removeFromCart, decreaseQuantity} = useCartState();
    useEffect(() => {
        console.log(cart)
    }, [cart])
    return (
        <Card
            direction={{base: "row"}}
            overflow='hidden'
            variant='outline'
            border="none"
            height={{base: "120px"}}
            >
            <Image
                borderRadius={6}
                objectFit='cover'
                maxWidth={{base: '121px'}}
                minWidth={{ base: '120px'}}
                src={product?.images?.[0]}
                alt={product.name}
            />
            <Flex w="full" flexDirection={"column"}>
                <CardBody>
                    <Flex justifyContent={'space-between'} alignItems={'start'}>
                        <Flex flexDirection={'column'}>
                            <Heading size={{base: "xs"}}>{product.name}</Heading>
                            <Text fontSize={{base: "0.8rem"}}>
                                {product.color}, {product.size}
                            </Text>
                        </Flex>
                        <NumberInput size='sm' maxW={20} defaultValue={product.quantity} min={1}>
                            <NumberInputField />
                            <NumberInputStepper>
                            <NumberIncrementStepper onClick={()=>addToCart(product)} />
                            <NumberDecrementStepper onClick={()=>decreaseQuantity(product.product_id)} />
                            </NumberInputStepper>
                        </NumberInput>
                    </Flex>
                    <Text fontWeight={"500"} mt={4} fontSize={{base: "0.9rem"}}>
                        × ${product.price} = ${product.quantity * product.price }
                    </Text>
                    <Text onClick={()=>removeFromCart(product.product_id)} cursor={"pointer"} _hover={{color: "red.200", transition: "0.5s"}} color="red" fontWeight={"500"} textAlign={"right"} fontSize={{base: "0.8rem"}}>
                        Remove
                    </Text>
                </CardBody>
            </Flex>
        </Card>
    )
}

export default SingleCart
