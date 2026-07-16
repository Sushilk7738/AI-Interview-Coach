import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../utils/token";
import Navbar from "../components/Navbar";
import { getCurrentUser } from "../api/authApi";
import { useEffect, useState } from "react";
import { AuthProvider } from "../context/AuthContext";




const ProtectedRoute = () =>{
    const token = getAccessToken();
    const [user, setUser] = useState(null);


    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data);
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchCurrentUser();
    }, [])
    

    if (!token){
        return <Navigate to="/login" />;
    }

    return (
        <AuthProvider value={{ user }}>
            <Navbar user={user} />
            <Outlet/>
        </AuthProvider>
    );
};

export default ProtectedRoute;