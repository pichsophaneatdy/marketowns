import { useState } from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import styles from "./register-page.module.scss";

const RegisterPage = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [confirmPwd, setConfirmPwd] = useState<string>("");
    const [show1, setShow1] = useState<boolean>(false);
    const [show2, setShow2] = useState<boolean>(false);
    const handleClick = () => setShow1(!show1);
    const handleClick2 = () => setShow2(!show2);
    
    // Handle Submitting
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(username)
        console.log(email)
        console.log(pwd)
        console.log(confirmPwd)
    }
    return (
        <section className={styles.register}>
            <h1 className={styles.register__title}>Register with Marketowns</h1>
            {/* Register Form */}
            <form onSubmit={handleSubmit} className={styles.register__form}>
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
                    <Button onClick={handleSubmit} mt="5" colorScheme='teal' size='sm'>
                        Register
                    </Button>
                </Stack>
            </form>
        </section>
    )
}

export default RegisterPage