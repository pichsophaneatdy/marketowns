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
    Text
} from "@chakra-ui/react";
import { loginUser } from '@/aws/awsCognito';
import { useRouter } from 'next/router';
import { getCurrentUser } from '@/aws/awsCognito';

const LoginPage = () => {

    const router = useRouter();

    const [username, setUsername] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClick = () => setShow(!show);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await loginUser(username, pwd);
            console.log("success")
            router.push("/dashboard");
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCurrentUser()
            .then(() => {
                router.push("/dashboard")
            })
            .catch((error) => {

            })
    }, [])

    return (
        <section className={styles.login}>
            <h1 className={styles.login__title}>Login to Marketowns</h1>
            <form className={styles.login__form}>
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
                </Stack>
            </form>
        </section>
    )
}

export default LoginPage