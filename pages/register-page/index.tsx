import { useState, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Text
} from "@chakra-ui/react";
import styles from "./register-page.module.scss";
import { useRouter } from "next/router";
// AWS functions
import { getCurrentUser, registerUser, verifyUser } from "@/aws/awsCognito";

const RegisterPage = () => {
    const router = useRouter();

    // State
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [confirmPwd, setConfirmPwd] = useState<string>("");
    const [show1, setShow1] = useState<boolean>(false);
    const [show2, setShow2] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoading2, setIsLoading2] = useState<boolean>(false);
    const [usernameAWS, setUsernameAWS] = useState<string>("");
    const [code, setCode] = useState<string>("");

    const [formError, setFormError] = useState<string>("");
    const [verificationError, setVerificationError] = useState<string>("");
    // Form function
    const handleClick = () => setShow1(!show1);
    const handleClick2 = () => setShow2(!show2);
    
    // Handle Registering New User
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        // Check if all required fields are filled
        if(!username || !email || !pwd || !confirmPwd) {
            setFormError("Missing required information");
            return;
        }
        // Check if password matched confirm password
        if(pwd !== confirmPwd) {
            setFormError("Your password does not match the confirm password.");
            return;
        }
        try {
            setIsLoading(true);
            const data: any = await registerUser(username, email, pwd);
            setUsernameAWS(data);
            setIsLoading(false);
        } catch(error) {
            setFormError("Unable to create your account at the momment");
            setIsLoading(false);
        }
        
    }

    // Handle Verify Unregistered User with Verification Code
    const handleVerify =  async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading2(true);
            const result = await verifyUser(usernameAWS, code);
            if(result === 'SUCCESS') router.push("/login-page");
            setIsLoading2(false);
        } catch(error) {
            setVerificationError("Your verification code is invalid or expired.")
            setIsLoading2(false);
        }
    }

    // Clear errors when user starts typing
    useEffect(() => {
        setFormError("");
    }, [username, pwd, confirmPwd, email])
    useEffect(() => {
        setVerificationError("");
    }, [code])

    // Check if the user is log in alreafy
    useEffect(() => {
        getCurrentUser()
            .then(() => {
                router.push("/products")
            })
            .catch((error) => {
                
            })
    }, [])
    return (
        <section className={styles.register}>
            {
                !usernameAWS.length ? (
                    <>
                    <h1 className={styles.register__title}>Register with Marketowns</h1>
                    {/* Register Form */}
                    <form onSubmit={handleSubmit} className={styles.register__form}>
                        {formError && <Text mb="5" fontSize="sm" color="red">{formError}</Text>}
                        <Stack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel fontSize="sm">Username</FormLabel>
                                <Input 
                                    value={username}
                                    onChange={(e)=>setUsername(e.target.value)}
                                    variant='flushed' 
                                    type='text' 
                                    size="sm" 
                            />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontSize="sm">Email address</FormLabel>
                                <Input 
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    variant='flushed' 
                                    type='email' 
                                    size="sm"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontSize="sm">Password</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        pr='4.5rem'
                                        variant='flushed' 
                                        type={show1 ? 'text' : 'password'}
                                        value={pwd}
                                        onChange={(e)=>setPwd(e.target.value)}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='xs' onClick={handleClick}>
                                        {show1 ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontSize="sm">Confirm Password</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        pr='4.5rem'
                                        variant='flushed' 
                                        type={show2 ? 'text' : 'password'}
                                        value={confirmPwd}
                                        onChange={(e)=>setConfirmPwd(e.target.value)}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='xs' onClick={handleClick2}>
                                        {show2 ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            {
                                isLoading ? (
                                    <Button
                                        isLoading
                                        loadingText='Loading'
                                        colorScheme='teal'
                                        variant='outline'
                                        spinnerPlacement='end'
                                    ></Button>
                                ): (
                                    <Button onClick={handleSubmit} mt="5" colorScheme='green' bgColor={'green.400'} size='sm'>
                                        Register
                                    </Button>
                                )
                            }
                        </Stack>
                    </form>
                    </>
                ) : (
                    <>
                        <h1 className={styles.register__title}>Verification Step</h1>
                        {/* Verifying registerd user via SMS */}
                        <form className={styles.register__form}>
                            <FormControl isRequired>
                                <FormLabel fontSize="sm">Verification Code</FormLabel>
                                <Input 
                                    value={code}
                                    onChange={(e)=>setCode(e.target.value)}
                                    variant='flushed' 
                                    type='text' 
                                    size="sm" 
                            />
                            </FormControl>
                            {verificationError && <Text mt="5" fontSize="sm" color="red">{verificationError}</Text>}
                            {
                                isLoading2 ? (
                                    <Button
                                        isLoading
                                        loadingText='Loading'
                                        colorScheme='green'
                                        variant='outline'
                                        spinnerPlacement='end'
                                        w="100%"
                                        mt="5"
                                    ></Button>
                                ): (
                                    <Button w="100%" onClick={handleVerify} mt="5" colorScheme='green' size='sm'>
                                        Verify
                                    </Button>
                                )
                            }
                        </form>
                    </>
                )
            }
            
            
        </section>
    )
}

export default RegisterPage