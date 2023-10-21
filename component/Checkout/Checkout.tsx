import React from 'react'
import {Button,Flex, Text, Stack, FormControl, FormLabel, Input, Radio, RadioGroup, Select} from "@chakra-ui/react";
import countries from '@/data/countryData';

interface CheckoutProps {
    name: string,
    setName: (value: string) => void,
    address: string,
    setAddress: (value: string) => void,
    apt: string,
    setApt: (value: string) => void,
    zipCode: string,
    setZipCode: (value: string)=> void,
    city: string,
    setCity: (value: string) => void,
    country: string,
    setCountry: (value: string) => void,
    payment: string,
    setPayment: (value: string) => void,
    handleCheckout: (e: React.FormEvent) => void
}
function Checkout({name, setName, address, setAddress, apt, setApt, city, zipCode, setZipCode, setCity, country, setCountry, payment, setPayment, handleCheckout}: CheckoutProps) {
    return (
        <Flex minH={"100vh"} gap={4} flexGrow={1} borderRadius={8} mt={{base: 10,md: 0}} flexDirection={'column'} w={{base: "100%",xl: "40%"}}>
            {/* Shipping Info */}
            <Flex bgColor={"white"} borderRadius={4} padding={6} flexDirection={"column"}>
                <Text fontSize={{base: "md"}} fontWeight={"600"}>SHIPPING INFORMATION</Text> 
                <Stack spacing={6} my={{base: 6}}>
                    <FormControl isRequired>
                        <FormLabel fontSize="xs">FULL NAME</FormLabel>
                        <Input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                borderRadius={4}
                                type='text' 
                                size="sm" 
                                bgColor={"white"}
                        />
                        </FormControl>
                        <FormControl w="30%" isRequired>
                            <FormLabel fontSize="xs">APT/SUITE</FormLabel>
                            <Input
                                value={apt}
                                onChange={(e) => setApt(e.target.value)} 
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
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                borderRadius={4}
                                type='text' 
                                size="sm" 
                                bgColor={"white"}
                        />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel fontSize="xs">ZIP CODE</FormLabel>
                            <Input 
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                borderRadius={4}
                                type='text' 
                                size="sm" 
                                bgColor={"white"}
                        />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel fontSize="xs">COUNTRY</FormLabel>
                            <Select borderRadius={4} size="sm" value={country} onChange={(e)=>setCountry(e.target.value)} placeholder="Select country">
                                {
                                    countries.map((country: string) => {
                                        return <option value={country}>{country}</option>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Flex>
                </Stack>
            </Flex>
            {/* Payment Information */}
            <Flex bgColor={"white"} borderRadius={4} padding={6} flexDirection={"column"}>
                <Text fontSize={{base: "md"}} fontWeight={"600"}>PAYMENT INFORMATION</Text>
                <Text mt={2} color={"gray.400"} fontWeight={500} fontSize={{base: "sm"}}>We are only accepting payment at delivery at the moment. Sorry for the inconvenience.</Text>
                <Radio my={{base: 4, md: 6}} value='true'>Pay at delivery</Radio>
                <Button onClick={handleCheckout} colorScheme='green'>Checkout</Button>
            </Flex>
        </Flex>
    )
}

export default Checkout