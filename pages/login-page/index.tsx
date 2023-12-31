import {useState, useEffect} from 'react'
import styles from "./login-page.module.scss";
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Text,
    Alert,
    AlertIcon
} from "@chakra-ui/react";
import { loginUser } from '@/configuration/awsCognito';
import { useRouter } from 'next/router';
import { getCurrentUser } from '@/configuration/awsCognito';

const LoginPage = () => {

    const router = useRouter();

    const [username, setUsername] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>("");

    const handleClick = () => setShow(!show);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if(!username ||!pwd) {
            setError("Please enter your username and password");
            return;
        }
        try {
            const data = await loginUser(username, pwd);
            router.push("/products");
        } catch(error: any) {
            setError(error.message || "Something went wrong");
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCurrentUser()
            .then(() => {
                router.push("/products")
            })
            .catch((error) => {

            })
    }, [])
    useEffect(() => {
        setError("");
    }, [username, pwd])

    return (
        <section className={styles.login}>
            <h1 className={styles.login__title}>Login to Marketowns</h1>
            
            <form className={styles.login__form}>
                {
                    error && (
                        <Alert p={2} fontSize={"sm"} mb={4} variant="left-accent" status='error'>
                            <AlertIcon />
                            {error}
                        </Alert>
                    )
                }
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
                        <FormLabel fontSize="sm">Password</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                variant='flushed' 
                                type={show ? 'text' : 'password'}
                                value={pwd}
                                onChange={(e)=>setPwd(e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='xs' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
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
                            <Button onClick={handleSubmit} mt="5" colorScheme='green' size='sm'>
                                Login
                            </Button>
                        )
                    }
                    <Text fontSize={"sm"} textAlign={"center"}>
                        Do not have an account?
                        <Text ml="0.2rem" as="a" href="/register-page" fontWeight={600} textDecoration={"underline"}>Sign Up</Text>
                    </Text>
                </Stack>
            </form>
        </section>
    )
}

export default LoginPage