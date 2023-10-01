import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/aws/awsCognito';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from "./dashboard.module.scss";
import {Flex, Text, Center} from "@chakra-ui/react";
// data
import { categories } from '@/data/productData';
// Components
import Filter from '@/component/Filter/Filter';
import ProductList from '@/component/ProductList/ProductList';

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

const dashboard = (props:any) => {
    const [isLoading, setIsLoading] = useState(true);
    // Filtering states
    const [filterProducts, setFilterProduct] = useState<Product[]>(props.data)
    const [price, setPrice] = useState({min: 0, max: 1000});
    const [category, setCategory] = useState<number>(0);
    const [size, setSize] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [condition, setCondition] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        getCurrentUser()
            .then((response) => {
                setIsLoading(false);
            })
            .catch(() => {
                router.push("/login-page");
            })
    }, []);

    if(isLoading) {
        return <p>Loading...</p>
    }

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(category)
        const products = props.data.filter((product: Product) => {
            const PriceInRange = Number(product.price) >= price.min && Number(product.price) <= price.max;
            const colorMatched = color === '' || product.color === color;
            const sizeMatched = size === '' || product.size === size;
            const conditionMatched = condition === '' || product.condition === condition;
            const categoryMatch = category === 0 || Number(product.category_id) === category;
            return (
                PriceInRange &&
                colorMatched &&
                conditionMatched &&
                sizeMatched &&
                categoryMatch
            )
        })
        console.log(products)
        setFilterProduct(products);
    }
    return (
        <>
            <Center h="100px" fontSize={{base: "2xl", md: "3xl"}} fontWeight={'600'}>
                FEATURED PRODUCTS
            </Center>
            <Filter
                price={price}
                setPrice={setPrice}
                category={category!}
                setCategory={setCategory}
                size={size}
                setSize={setSize}
                color={color}
                setColor={setColor}
                condition={condition}
                setCondition={setCondition}
                handleFilter={handleFilter}
            />
            <section className={styles.dashboard}>
                {
                    filterProducts.length > 0 ? <ProductList data={filterProducts}/> : <Text>No products found.</Text>
                }
                
            </section>      
        </>
    )
}

export async function getServerSideProps() {
    const response = await axios.get("https://iqkyzfpq17.execute-api.us-east-1.amazonaws.com/dev/product/all");
    return {
        props: {data: response.data}
    }
}

export default dashboard