import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCurrentUser } from "@/hooks/awsCognito";

interface ProtectedRouteProps {
    children: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const router = useRouter();

    useEffect(() => {
        getCurrentUser()
            .then((username) => {
                console.log("Authentication")
            })
            .catch((error) => {
                router.push("/login-page")
            })
    }, [])

    return <>{children}</>
}
export default ProtectedRoute;