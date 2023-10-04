import axios from 'axios'
import React, { useEffect } from 'react'
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { MdLocalShipping } from 'react-icons/md'
import { useState } from 'react';
// Add to to cart
import useCartState from '@/context/CartContext';
const Product_Page = (props: any) => {
    const product = props.data;

    const router = useRouter();

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
    useEffect(() => {
        console.log(image)
    }, [image])
    // Add to cart
    const addToCart = useCartState((state) => state.addToCart)
    
    return (
        (
            <Container maxW={'7xl'} pb={{ base: 18, md: 24 }} pt={{base: 8, md: 10, lg: 14}}>
                <Button onClick={()=>router.back()} leftIcon={<FiArrowLeft />} mb={4} bgColor="transparent">Go back</Button>
                <SimpleGrid
                    columns={{ base: 1, lg: 2 }}
                    spacing={{ base: 8, md: 10 }}
                >
                    <Box position={"relative"} flexDirection={"column"} alignItems={"start"}>
                        <Image
                            rounded={'md'}
                            alt={'product image'}
                            src={product.images[image]}
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={{ base: '100%', sm: '400px', lg: '500px' }}
                        />
                        <Box
                            position="absolute"
                            top="50%"
                            left="5%"
                            transform="translate(-50%, -50%)"
                            bgColor="white" // Customize the background color as needed
                            p="2"
                            borderRadius="50%"
                            onClick={handlePrevImg}
                            cursor={"pointer"}
                        >
                            <FiArrowLeft size="15px" position={"absolute"} top={0} />
                        </Box>
                        <Box
                            position="absolute"
                            top="50%"
                            right="0%"
                            transform="translate(-50%, -50%)"
                            bgColor="white" // Customize the background color as needed
                            p="2"
                            borderRadius="50%"
                            onClick={handleNextImg}
                            cursor={"pointer"}
                        >
                            <FiArrowRight size="15px" position={"absolute"} top={0} />
                        </Box>
                        
                    </Box>
                    <Stack spacing={{ base: 6, md: 10 }}>
                    <Box as={'header'}>
                        <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: '2xl', sm: '4xl' }}>
                        {product.name}
                        </Heading>
                        <Text
                        mt={4}
                        color={useColorModeValue('gray.900', 'gray.400')}
                        fontWeight={300}
                        fontSize={'2xl'}>
                        ${product.price} CAD
                        </Text>
                    </Box>
            
                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={'column'}
                        divider={
                        <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
                        }>
                        <Text fontSize={'lg'}>
                            {product.desc}
                        </Text>
                        <Box>
                        <Text
                            fontSize={{ base: '16px', lg: '18px' }}
                            fontWeight={'600'}
                            textTransform={'uppercase'}
                            mb={'4'}>
                            Product Details
                        </Text>
            
                        <List spacing={2}>
                            <ListItem>
                            <Text as={'span'} fontWeight={'bold'}>
                                Color:
                            </Text>{' '}
                            {product.color}
                            </ListItem>
                            <ListItem>
                            <Text as={'span'} fontWeight={'bold'}>
                                Size:
                            </Text>{' '}
                            {product.size}
                            </ListItem>
                            <ListItem>
                            <Text as={'span'} fontWeight={'bold'}>
                                Condition:
                            </Text>{' '}
                            {product.condition}
                            </ListItem>
                        </List>
                        </Box>
                    </Stack>
            
                    <Button
                        rounded={'none'}
                        w={'full'}
                        mt={8}
                        size={'lg'}
                        py={'7'}
                        bg={useColorModeValue('gray.900', 'gray.50')}
                        color={useColorModeValue('white', 'gray.900')}
                        textTransform={'uppercase'}
                        _hover={{
                        transform: 'translateY(2px)',
                        boxShadow: 'lg',
                        }}
                        onClick={() => {
                            addToCart(product)
                        }}
                    >
                        Add to cart
                    </Button>
            
                    <Stack direction="row" alignItems="center" justifyContent={'center'}>
                        <MdLocalShipping />
                        <Text>2-3 business days delivery</Text>
                    </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
        )
    )
}
export async function getServerSideProps(context: any) {
    try {
        const {product_id} = context.query; 
        const product = await axios.get(`https://iqkyzfpq17.execute-api.us-east-1.amazonaws.com/dev/product/single?product_id=${product_id}`);
        return {
            props: {
                data: product.data
            }
        }
    } catch(error) {
        console.log(error)
    }
}
export default Product_Page