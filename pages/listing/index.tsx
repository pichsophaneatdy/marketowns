import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Product } from '@/interface/product';
import { getCurrentUser } from '@/configuration/awsCognito';
import { CircularProgress, Flex, Text,  Table, Thead, Tbody,Tfoot,Tr,Th,Td, TableContainer, } from '@chakra-ui/react';

const getProduct = async() => {
    const user = await getCurrentUser();
    try {
        const products = await axios.get(`${process.env.NEXT_PUBLIC_API_1 }/listing?seller_id=${user.username}`);
        return products.data
    } catch(error) {
        console.log(error)
        return []
    }
}

const listing = (props: any) => {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        async function fetchProducts () {
            try {
                setIsLoading(true)
                const productsData = await getProduct();
                setProducts(productsData);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false)
            }
        }
        // Call asynchronous function
        fetchProducts();
    }, [])

    if(isLoading) {
        return( 
            <Flex mt="10" justifyContent={'center'}>
                <CircularProgress isIndeterminate color='green.300' />
            </Flex>
        )
    }
    return (
        <Flex>
            {
                products.length === 0 ? (
                    <Flex>
                        <Text>You have no listing on Marketowns.</Text>
                    </Flex>
                ) : (
                    // Render the listing products in a table
                    <TableContainer w="100%" my={{base: 6, lg: 16}} px={{base: 0, md: 4, lg: "8%"}}>
                        <Text mb={{base: 4, lg: 10}} fontSize={"lg"} fontWeight={500} px={6}>Your Listing</Text>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Product Name</Th>
                                    <Th>Listing Date</Th>
                                    <Th isNumeric>Price</Th>
                                    <Th>Sold</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    products.map((product) => {
                                        let date = new Date(Number(product.date))
                                        return (
                                            <Tr>
                                                <Td>{product.name}</Td>
                                                <Td>{date.getMonth()}-{date.getFullYear()}-{date.getDate()}</Td>
                                                <Td isNumeric>{product.price}</Td>
                                                <Td>No</Td>
                                        </Tr>
                                        )
                                    })
                                }
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>Total</Th>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th>{products.length}</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                )
            }
        </Flex>
        
    )
}

export default listing