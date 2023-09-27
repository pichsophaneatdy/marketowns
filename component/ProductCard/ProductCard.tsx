import {
    Flex,
    Box,
    Image,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import { FiShoppingCart } from 'react-icons/fi'

interface RatingProps {
    rating: number
    numReviews: number
}

interface CardProps {
    rating: number,
    numReviews: number,
    isNew: boolean,
    imageURL: string,
    name: string, 
    price: number,
}

function Rating({ rating, numReviews }: RatingProps) {
    return (
        <Box display="flex" alignItems="center">
        {Array(5)
            .fill('')
            .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2
            if (roundedRating - i >= 1) {
                return (
                <BsStarFill
                    key={i}
                    style={{ marginLeft: '1' }}
                    color={i < rating ? 'teal.500' : 'gray.300'}
                />
                )
            }
            if (roundedRating - i === 0.5) {
                return <BsStarHalf key={i} style={{ marginLeft: '1' }} />
            }
            return <BsStar key={i} style={{ marginLeft: '1' }} />
            })}
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {numReviews} review{numReviews > 1 && 's'}
        </Box>
    </Box>
    )
}

const ProductCard: React.FC<CardProps> = ({rating, numReviews, isNew, imageURL, name, price}) => {
    return (
        <Flex
            cursor={'pointer'}
            flexDirection={"column"} 
            bg={useColorModeValue('white', 'gray.800')}
            borderWidth="1px"
            rounded="md"
            shadow="lg" 
            w={{base: "100%", md: "48%" , lg: "31%", xl: "23%"}}
        >
            <Image roundedTop="md" height={{base: "200px"}} w="full" objectFit={"cover"}  src={imageURL} alt={name}/>
            <Box p={{base: 4}}>
                <Flex justifyContent={"space-between"}>
                    <Text fontWeight={"500"}>{name}</Text>
                    <Text>${price}</Text>
                </Flex>
                
            </Box>
            
        </Flex>
    )
}

export default ProductCard