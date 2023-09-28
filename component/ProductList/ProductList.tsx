import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { Flex } from '@chakra-ui/react'

interface Product {
    category_id: number,
    color: string, 
    condition: string, 
    date: string, 
    desc: string, 
    images: string[],
    name: string, 
    price: string, 
    product_id: string, 
    seller_id: string, 
    size: string
}
interface ProductListProp {
    data: Product[]
}
const ProductList: React.FC<ProductListProp> = ({data}) => {
    return (
            <Flex py={{base: 10}} px={{base: 0, md: 4, lg: 8}} flexWrap={"wrap"} gap={{base: 4, md: 6, lg: 8}} flexDirection={{base: "column", md: "row"}} justifyContent={{md: "space-between"}}>
            {
                data?.map((product) => {
                    return (
                        <ProductCard 
                            product_id={product.product_id}
                            imageURL={product.images[0]}
                            name={product.name}
                            price={Number(product.price)}
                        />
                    )
                })
            }
            </Flex>
        
    )
}

export default ProductList