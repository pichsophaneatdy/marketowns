import React from 'react'
import {Button,Flex, Text, Stack, FormControl, FormLabel, Input, Radio, RadioGroup} from "@chakra-ui/react";

function Checkout() {
    return (
        <Flex minH={"100vh"} gap={4} flexGrow={1} borderRadius={8} mt={{base: 10,md: 0}} flexDirection={'column'} w={{base: "100%",xl: "40%"}}>
            {/* Shipping Info */}
            <Flex bgColor={"white"} borderRadius={4} padding={6} flexDirection={"column"}>
                <Text fontSize={{base: "md"}} fontWeight={"600"}>SHIPPING INFORMATION</Text> 
                <Stack spacing={6} my={{base: 6}}>
                    <FormControl isRequired>
                        <FormLabel fontSize="xs">FULL NAME</FormLabel>
                        <Input 
                            borderRadius={4}
                            type='text' 
                            size="sm" 
                            bgColor={"white"}
                        />  
                    </FormControl>
                    <Flex gap={4}>
                        <FormControl flexGrow={1} isRequired>
                            <FormLabel fontSize="xs">STREET ADDRESS</FormLabel>
                            <Input 
                                borderRadius={4}
                                type='text' 
                                size="sm" 
                                bgColor={"white"}
                        />
                        </FormControl>
                        <FormControl w="30%" isRequired>
                            <FormLabel fontSize="xs">APT/SUITE</FormLabel>
                            <Input 
                                borderRadius={4}
                                type='text' 
                                size="sm" 
                                bgColor={"white"}
                        />
                        </FormControl>
                    </Flex>
                    <Flex gap={4}>
                        <FormControl isRequired>
                            <FormLabel fontSize="xs">CITY</FormLabel>
                            <Input 
                                borderRadius={4}
                                type='text' 
                                size="sm" 
                                bgColor={"white"}
                        />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel fontSize="xs">ZIP CODE</FormLabel>
                            <Input 
                                borderRadius={4}
                                type='text' 
                                size="sm" 
                                bgColor={"white"}
                        />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel fontSize="xs">COUNTRY</FormLabel>
                            <Input 
                                borderRadius={4}
                                type='text' 
                                size="sm" 
                                bgColor={"white"}
                        />
                        </FormControl>
                    </Flex>
                </Stack>
            </Flex>
            {/* Payment Information */}
            <Flex bgColor={"white"} borderRadius={4} padding={6} flexDirection={"column"}>
                <Text fontSize={{base: "md"}} fontWeight={"600"}>PAYMENT INFORMATION</Text>
                <Text mt={2} color={"red.400"} fontWeight={500} fontSize={{base: "sm"}}>We are only accepting payment at delivery at the moment.</Text>
                <Radio my={{base: 4, md: 6}} value='true'>Pay at delivery</Radio>
                <Button colorScheme='green'>Checkout</Button>
            </Flex>
        </Flex>
    )
}

export default Checkout