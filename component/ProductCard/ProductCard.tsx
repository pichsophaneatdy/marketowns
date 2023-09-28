import {
    Flex,
    Box,
    Image,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'

import { useRouter } from 'next/router'


interface CardProps {
    product_id: string,
    imageURL: string,
    name: string, 
    price: number,
}

const ProductCard: React.FC<CardProps> = ({product_id,imageURL, name, price}) => {

    const router = useRouter();
    return (
        <Flex
            onClick={()=>router.push(`/products/${product_id}`)}
            cursor={'pointer'}
            flexDirection={"column"} 
            bg={useColorModeValue('white', 'gray.800')}
            borderWidth="1px"
            rounded="md"
            shadow="lg" 
            w={{base: "100%", md: "48%" , lg: "31%", xl: "23%"}}
        >
            <Image roundedTop="md" height={{base: "200px"}} w="full" objectFit={"cover"}  src={imageURL} alt={name}/>
            <Box p={{base: 4}}>
                <Flex justifyContent={"space-between"}>
                    <Text fontWeight={"500"}>{name}</Text>
                    <Text>${price}</Text>
                </Flex>
                
            </Box>
            
        </Flex>
    )
}

export default ProductCard