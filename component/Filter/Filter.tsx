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
// Component
import FilterSlider from '../Slider/Slider';
// Data
import { categories } from '@/data/productData';
import { sizes } from '@/data/productData';
import { colors } from "@/data/productData";
import { productConditions } from '@/data/productData';


interface FilterProps {
    price: {min: number, max: number}
    setPrice: (value: any) => void
    category: number
    setCategory: (value: number) => void
    size: string
    setSize: (value: string) => void
    color: string
    setColor: (value: string) => void
    condition: string
    setCondition: (value: string) => void
    handleFilter: (e: React.FormEvent) => void
}
const Filter: React.FC<FilterProps> = ({price, setPrice, category, setCategory, size, setSize, color, setColor, condition, setCondition, handleFilter}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef: any= useRef();

    return (
        <Flex px={4} mx={{sm: "auto"}} gap={{base: 2}} maxW={"600px"}>
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
                            <FormLabel>Price</FormLabel>
                            <Flex gap="1rem">
                                <Input 
                                    value={price.min} 
                                    onChange={(e) => setPrice({min: Number(e.target.value), max: price.max})} 
                                    type="number" 
                                    placeholder='Min' 
                                />
                                <Input 
                                    value={price.max} 
                                    onChange={(e) => setPrice({min: price.min, max: Number(e.target.value)})}
                                    type="number" 
                                    placeholder='Max' />
                            </Flex>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <Select value={category} onChange={(e) => setCategory(Number(e.target.value))} placeholder='Select category'>
                                {
                                    categories.map((category: string, index: number) => {
                                        return <option key={index} value={index+1}>{category}</option>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Size</FormLabel>
                            <Select value={size} onChange={(e) => setSize(e.target.value)} placeholder='Select size'>
                                {
                                    sizes.map((size: string, index: number) => {
                                        return <option key={index} value={size}>{size}</option>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Color</FormLabel>
                            <Select value={color} onChange={(e) => setColor(e.target.value)} placeholder='Select color'>
                                {
                                    colors.map((color: string, index: number) => {
                                        return <option key={index} value={color}>{color}</option>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Condition</FormLabel>
                            <Select value={condition} onChange={(e) => setCondition(e.target.value)} placeholder='Select condition'>
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
                <Button onClick={handleFilter} size={{base: "sm"}} colorScheme='green' bgColor={"green.400"}>Filter</Button>
                </DrawerFooter>
            </DrawerContent>
            </Drawer>
        </ Flex>
    )
}

export default Filter