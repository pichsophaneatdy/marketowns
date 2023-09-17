import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/hooks/awsCognito';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from "./dashboard.module.scss";
import {Flex, Text, Center} from "@chakra-ui/react";
// Components
import ProductCard from '@/component/ProductCard/ProductCard';
import Filter from '@/component/Filter/Filter';


const dashboard = (props:any) => {
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        getCurrentUser()
            .then(() => {
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
                <Flex flexWrap={'wrap'} justifyContent={'space-evenly'}>
                {
                    props.data.map((product:any) => {
                        return <ProductCard key={product.product_id}/>
                    })
                }
                </Flex>
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