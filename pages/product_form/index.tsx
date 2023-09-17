import React from 'react'
import { Select, Stack, Text, FormControl, FormLabel, Input, Textarea} from '@chakra-ui/react'

const ProductForm = () => {
    return (
        <Stack spacing={3} px={{base:"4", md:"5%"}} py={{base: "2rem", md: "4rem"}}>
            <Text color="gray" mb="1rem" fontWeight="600" fontSize={{base: 'lg'}}>Post your product today!</Text>
            <FormControl>
                <FormLabel fontSize="sm">Product Name</FormLabel>
                <Input size="sm" type='text' />
            </FormControl>
            <FormControl>
                <FormLabel fontSize="sm">Price</FormLabel>
                <Input size="sm" type='number' />
            </FormControl>
            <FormControl>
                <FormLabel fontSize="sm">Size</FormLabel>
                <Stack spacing={3}>
                    <Select placeholder='Select your size' size='sm'>
                        <option value='none'>None</option>
                        <option value='small'>Small</option>
                        <option value='medium'>Medium</option>
                        <option value='large'>Large</option>
                        <option value='extra large'>Extra Large</option>
                    </Select>
                </Stack>
            </FormControl>
            <FormControl>
                <FormLabel fontSize="sm">Description</FormLabel>
                <Textarea placeholder='Here is a sample placeholder' />
            </FormControl>
        </Stack>
    )
}

export default ProductForm