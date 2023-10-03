import React from 'react'
import { Card, Heading, CardBody, CardFooter, Button, Image, Stack, Text } from '@chakra-ui/react'

const SingleCart = () => {
    return (
        <Card
            direction={{base: "row"}}
            overflow='hidden'
            variant='outline'
            border="none"
            >
            <Image
                borderRadius={6}
                objectFit='cover'
                maxW={{ base: '30%', sm: '25%' }}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
            />

            <Stack>
                <CardBody>
                <Heading size='sm'>The perfect latte</Heading>

                <Text>
                    Caffè latte
                </Text>

                <Button size="xs"  variant='solid' colorScheme='blue'>
                    Buy Latte
                </Button>
                </CardBody>
            </Stack>
        </Card>
    )
}

export default SingleCart
