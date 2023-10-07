import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Product } from '@/interface/product';
import { getCurrentUser } from '@/configuration/awsCognito';
import { CircularProgress, Flex, Text } from '@chakra-ui/react';
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
                products.length > 0 ? (
                    <Flex>
                        <Text>You have no listing on Marketowns.</Text>
                    </Flex>
                ) : (
                    <Flex>
                    </Flex>
                )
            }
        </Flex>
        
    )
}

export default listing