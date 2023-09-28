import axios from 'axios'
import React from 'react'

const Product_Page = (props: any) => {
    const product = props.data;
    console.log(product)
    return (
        <div>Product Page</div>
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