import React from 'react'

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
        <div>
            {
                data?.map((product) => {
                    return <p>{product.name}</p>
                })
            }
        </div>
    )
}

export default ProductList