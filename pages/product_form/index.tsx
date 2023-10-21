import { useState, useEffect} from 'react'
import { Select, Stack, Text, FormControl, FormLabel, Input, Textarea, Button} from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid';
import axios from "axios"
// Product Form Data
import { sizes } from '@/data/productData';
import {categories } from '@/data/productData';
import { productConditions } from '@/data/productData';
import { colors } from "@/data/productData";
// Component
import Upload from '@/component/Upload/Upload';
import Confirmation from '@/component/Confirmation';
// Upload function
import { handleUpload } from '@/functions/cloudinary';
// Cognito
import { getCurrentUser } from '@/functions/awsCognito';

const ProductForm = () => {

    // Form States
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [category, setCategory] = useState<number>(0);
    const [size, setSize] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [condition, setCondition] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [selectedImages, setSelectedImage] = useState<File[]>([]);
    // Form Status
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    // handle submit
    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        try {
            setIsLoading(true)
            const urls = await handleUpload(selectedImages);
            const currentUser = await getCurrentUser();
            console.log(currentUser.idToken)
            const newProduct = {
                product_id: uuidv4(),
                seller_id: currentUser.username,
                category_id: category+1,
                color: color,
                condition: condition,
                date: new Date().getTime(),
                desc: desc,
                images: urls,
                name:name,
                price: price, 
                size: size
            }
            await axios.post(process.env.NEXT_PUBLIC_API_1!, newProduct, {
                headers: {
                    Authorization: currentUser.idToken
                }
            })
            setSuccess(true);
            setName("");
            setPrice(0);
            setCategory(0);
            setSize("");
            setColor("");
            setCondition("");
            setDesc("");
            setSelectedImage([]);

        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }   

    return (
        <Stack bgColor={'gray.100'} minH={'100vh'} spacing={1} px={{base:"4", md:"5%", lg: "10%", xl: "25%"}} py={{base: "2rem", md: "4rem"}}>
            <Text fontWeight="600" fontSize={{base: 'lg'}}>Post your product today!</Text>
            <Text fontSize={{base: 'xs'}}>List your used product today on Market and start saving.</Text>
            {
                success && (
                    <Confirmation />
                )
            }
            <Stack alignItems={'center'} py={{base: "5"}} spacing={{base: 3, md: 5}}>
                <FormControl>
                    <FormLabel fontSize="sm">Product Name</FormLabel>
                    <Input value={name} onChange={(e) => setName(e.target.value)} borderRadius={4} bgColor="white" size="sm" type='text' />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="sm">Price</FormLabel>
                    <Input value={price} onChange={(e) => setPrice(Number(e.target.value))} borderRadius={4} bgColor="white"  size="sm" type='number' />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="sm">Category</FormLabel>
                    <Stack spacing={3}>
                        <Select value={category} onChange={(e) => setCategory(Number(e.target.value))} borderRadius={4} bgColor="white" placeholder='Select product category' size='sm'>
                            {
                                categories.map((category: string, index:number) => {
                                    return <option key={index} value={index}>{category}</option>
                                })
                            }
                        </Select>
                    </Stack>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="sm">Size</FormLabel>
                    <Stack spacing={3}>
                        <Select value={size} onChange={(e) => setSize(e.target.value)} borderRadius={4} bgColor="white" placeholder='Select product size' size='sm'>
                            {
                                sizes.map((size: string, index: number) => {
                                    return <option key={index} value={size}>{size}</option>
                                })
                            }
                        </Select>
                    </Stack>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="sm">Color</FormLabel>
                    <Select value={color} onChange={(e) => setColor(e.target.value)} borderRadius={4} bgColor="white" placeholder='Select color' size='sm'>
                            {
                                colors.map((color: string, index: number) => {
                                    return <option key={index} value={color}>{color}</option>
                                })
                            }
                        </Select>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="sm">Condition</FormLabel>
                    <Stack spacing={3}>
                        <Select value={condition} onChange={(e) => setCondition(e.target.value)} borderRadius={4} bgColor="white" placeholder='Select product condition' size='sm'>
                            {
                                productConditions.map((condition: string, index: number) => {
                                    return <option key={index} value={condition}>{condition}</option>
                                })
                            }
                        </Select>
                    </Stack>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="sm">Description</FormLabel>
                    <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} bgColor="white" fontSize="sm" placeholder='A short description about your product' />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="sm">Upload maximum three images of your products (Image size should not exceed 1MB)</FormLabel>
                    <Upload selectedImages={selectedImages} setSelectedImages={setSelectedImage} />
                </FormControl>
                {
                    isLoading ? (
                        <Button isLoading loadingText='Submitting' px={10} maxW={'200px'} bgColor={'green.400'} _hover={{bgColor: "green.500"}} color={'white'}>Submit</Button>
                    ) :(
                        <Button onClick={handleSubmit} px={10} maxW={'200px'} bgColor={'green.400'} _hover={{bgColor: "green.500"}} color={'white'}>Submit</Button>
                    )
                }
            </Stack>
        </Stack>
    )
}

export default ProductForm