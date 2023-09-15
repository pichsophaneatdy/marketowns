import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/hooks/awsCognito';
import { useRouter } from 'next/router';

const dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        getCurrentUser()
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                router.push("/login-page");
            })
    }, []);

    if(isLoading) {
        return <p>Loading...</p>
    }

    return <p>Sensitive Information</p>
}

export default dashboard