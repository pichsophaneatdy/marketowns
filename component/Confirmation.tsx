import {Alert, AlertTitle, AlertDescription, AlertIcon, Button} from "@chakra-ui/react";

const Confirmation = () => {
    return (
        <Alert
            status='success'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
            my={{base: 4}}
            borderRadius={{base: 8}}
        >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                Your product is uploaded.
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
                Thanks for uploading your product. It will be posted on marketowns soon.
            </AlertDescription>
            <Button mt="4" bg="transparent" color="blue.500" as="a" href="/products">Go back to homepage</Button>
        </Alert>
    )
}
export default Confirmation