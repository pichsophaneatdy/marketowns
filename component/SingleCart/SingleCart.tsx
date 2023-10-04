import React from 'react'
import { Card, Flex, Heading, CardBody, Image, Text } from '@chakra-ui/react'
import { Product, CartProduct } from '@/interface/product'

const SingleCart = ({product}: any)=> {
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

            <Flex flexDirection={"column"}>
                <CardBody>
                    <Heading size={{base: "xs"}}>{product.name}</Heading>
                    <Text fontSize={{base: "0.8rem"}}>
                        {product.color}, {product.size}
                    </Text>
                    <Text fontWeight={"500"} mt={4} fontSize={{base: "0.9rem"}}>
                        {product.quantity} × ${product.price} = ${product.quantity * product.price }
                    </Text>
                </CardBody>
            </Flex>
        </Card>
    )
}

export default SingleCart
