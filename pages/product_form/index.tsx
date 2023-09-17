import {useState} from 'react'
import { Select, Stack, Text, FormControl, FormLabel, Input, Textarea, Button} from '@chakra-ui/react'
// Component
import Upload from '@/component/Upload/Upload';

const ProductForm = () => {
    // Form States
    const [selectedImages, setSelectedImage] = useState<File[]>([]);
    // handle submit
    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
    }
    return (
        <Stack bgColor={'gray.100'} minH={'100vh'} spacing={1} px={{base:"4", md:"5%", lg: "10%", xl: "25%"}} py={{base: "2rem", md: "4rem"}}>
            <Text fontWeight="600" fontSize={{base: 'lg'}}>Post your product today!</Text>
            <Text fontSize={{base: 'xs'}}>List your used product today on Market and start saving.</Text>
            <Stack alignItems={'center'} py={{base: "5"}} spacing={{base: 3, md: 5}}>
                <FormControl>
                    <FormLabel fontSize="sm">Product Name</FormLabel>
                    <Input borderRadius={4} bgColor="white" size="sm" type='text' />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="sm">Price</FormLabel>
                    <Input borderRadius={4} bgColor="white"  size="sm" type='number' />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="sm">Category</FormLabel>
                    <Stack spacing={3}>
                        <Select borderRadius={4} bgColor="white" placeholder='Select product category' size='sm'>
                            {
                                categories.map((category: string, index:number) => {
                                    return <option key={index} value={category}>{category}</option>
                                })
                            }
                        </Select>
                    </Stack>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="sm">Size</FormLabel>
                    <Stack spacing={3}>
                        <Select borderRadius={4} bgColor="white" placeholder='Select product size' size='sm'>
                            {
                                sizes.map((size: string, index: number) => {
                                    return <option key={index} value={size}>{size}</option>
                                })
                            }
                        </Select>
                    </Stack>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="sm">Condition</FormLabel>
                    <Stack spacing={3}>
                        <Select borderRadius={4} bgColor="white" placeholder='Select product condition' size='sm'>
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
                    <Textarea bgColor="white" fontSize="sm" placeholder='A short description about your product' />
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="sm">Upload maximum three images of your products</FormLabel>
                    <Upload selectedImages={selectedImages} setSelectedImages={setSelectedImage} />
                </FormControl>
                <Button onClick={handleSubmit} px={10} maxW={'200px'} bgColor={'green.400'} _hover={{bgColor: "green.500"}} color={'white'}>Submit</Button>
            </Stack>
        </Stack>
    )
}
const sizes = [
    "Small",
    "Medium",
    "Large",
    "Extra-Large (XL)",
    "Extra-Small (XS)",
    "Petite",
    "Plus Size",
    "Tall",
    "Short",
    "One Size Fits All",
    "Youth Sizes",
    "Adult Sizes",
    "Baby Sizes",
    "Toddler Sizes",
    "Maternity Sizes",
    "Junior Sizes",
    "Misses Sizes",
    "Men's Sizes",
    "Women's Sizes",
    "Unisex Sizes"
];

const categories = [
    "Electronics",
    "Home and Garden",
    "Vehicles",
    "Clothing and Accessories",
    "Toys and Games",
    "Sports and Fitness",
    "Collectibles and Memorabilia",
    "Books, Music, and Movies",
    "Health and Beauty",
    "Baby and Kids",
    "Pet Supplies",
    "Art and Crafts",
    "Hobbies and Collectibles",
    "Jewelry and Watches",
    "Outdoor and Camping",
    "Home Appliances",
    "Gardening and Plants",
    "Musical Instruments",
    "Office Supplies",
    "Industrial Equipment"
];

const productConditions = [
    "New",
    "Like New",
    "Excellent",
    "Very Good",
    "Good",
    "Fair",
    "Acceptable",
    "Used",
    "Refurbished",
    "Open Box",
    "Damaged",
    "For Parts",
    "Not Working"
];


export default ProductForm