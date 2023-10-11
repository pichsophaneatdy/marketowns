import React from 'react'
import {Button,Flex, Text, Stack, FormControl, FormLabel, Input, Radio, RadioGroup} from "@chakra-ui/react";

function Checkout() {
    return (
        <Flex flexGrow={1} padding={6} bg={"gray.50"} borderRadius={8} mt={{base: 10,md: 0}} flexDirection={'column'} w={{base: "100%",lg: "37%"}}>
            <Text fontSize={{base: "lg"}} fontWeight={"600"}>You are almost there!</Text> 
            <Stack my={{base: 6}}>
                <FormControl isRequired>
                    <FormLabel fontSize="sm">Shipping Adress</FormLabel>
                    <RadioGroup>
                        <Stack fontSize="sm" direction='row'>
                            <Radio value='1'>Credit Card</Radio>
                            <Radio value='2'>Paypal</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontSize="sm">Adress</FormLabel>
                    <Input 
                        borderRadius={6}
                        type='text' 
                        size="sm" 
                        bgColor={"white"}
                />
                </FormControl>
            </Stack>
            <Button colorScheme='green'>Checkout</Button>
        </Flex>
    )
}

export default Checkout