import { useRef, RefObject } from 'react'
import {
    Flex,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    Stack,
    FormLabel,
    FormControl,
    Select
} from '@chakra-ui/react'
// Data
import { categories } from '@/data/productData';
import { sizes } from '@/data/productData';
import { colors } from "@/data/productData";
import { productConditions } from '@/data/productData';

export default function Filter() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef: any= useRef();

    return (
        <Flex mx={{base: 2, sm: "auto"}} gap={{base: 2}} maxW={"600px"}>
            <Input size={{base: "sm"}} borderRadius={{base: 4}} placeholder='Search for an item' />
            <Button size={{base: "sm"}} borderRadius={{base: 4}} bgColor={"green.400"} ref={btnRef} colorScheme='green' onClick={onOpen}>
                Filter
            </Button>
            <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
            >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader fontSize={{base: "md"}}>Filter by</DrawerHeader>
    
                <DrawerBody>
                    <Stack spacing={4}>
                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <Select placeholder='Select category'>
                                {
                                    categories.map((category: string, index: number) => {
                                        return <option key={index} value={category}>{category}</option>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Size</FormLabel>
                            <Select placeholder='Select size'>
                                {
                                    sizes.map((size: string, index: number) => {
                                        return <option key={index} value={size}>{size}</option>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Color</FormLabel>
                            <Select placeholder='Select color'>
                                {
                                    colors.map((color: string, index: number) => {
                                        return <option key={index} value={color}>{color}</option>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Condition</FormLabel>
                            <Select placeholder='Select condition'>
                                {
                                    productConditions.map((condition: string, index: number) => {
                                        return <option key={index} value={condition}>{condition}</option>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Stack>
                </DrawerBody>
    
                <DrawerFooter>
                <Button size={{base: "sm"}} variant='outline' mr={3} onClick={onClose}>
                    Cancel
                </Button>
                <Button size={{base: "sm"}} colorScheme='green' bgColor={"green.400"}>Save</Button>
                </DrawerFooter>
            </DrawerContent>
            </Drawer>
        </ Flex>
    )
}