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
    console.log(props.data)
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

    return (
        <>
            <Center h="100px" fontSize={{base: "2xl", md: "3xl"}} fontWeight={'600'}>
                FEATURED PRODUCTS
            </Center>
            <Filter />
            <section className={styles.dashboard}>
                <ProductList data={props.data}/>
            </section>      
        </>
    )
}

export async function getServerSideProps() {
    const response = await axios.get("https://iqkyzfpq17.execute-api.us-east-1.amazonaws.com/dev/product");
    return {
        props: {data: response.data}
    }
}

export default dashboard