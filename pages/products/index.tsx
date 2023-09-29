import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/aws/awsCognito';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from "./dashboard.module.scss";
import {Flex, Text, Center} from "@chakra-ui/react";
// Components
import ProductCard from '@/component/ProductCard/ProductCard';
import Filter from '@/component/Filter/Filter';
import ProductList from '@/component/ProductList/ProductList';

const dashboard = (props:any) => {
    const [isLoading, setIsLoading] = useState(true);
    // Filtering states
    const [price, setPrice] = useState<number>(0);
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

    const handleFilter = () => {
        console.log(price)
        console.log(category)
        console.log(size)
        console.log(color)
        console.log(condition)
    }
    return (
        <>
            <Center h="100px" fontSize={{base: "2xl", md: "3xl"}} fontWeight={'600'}>
                FEATURED PRODUCTS
            </Center>
            <Filter
                price={price}
                setPrice={setPrice}
                category={category}
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
                <ProductList data={props.data}/>
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