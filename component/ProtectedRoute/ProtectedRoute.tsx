import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/hooks/awsCognito";

interface ProtectedRouteProps {
    children: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((username) => {
                console.log("Authentication")
            })
            .catch((error) => {
                router.push("/login-page")
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])
    if(isLoading) {
        return <p>Loading...</p>
    }
    return <>{children}</>
}
export default ProtectedRoute;