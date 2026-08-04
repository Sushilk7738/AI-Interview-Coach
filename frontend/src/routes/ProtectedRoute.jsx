import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../utils/token";
import Navbar from "../components/Navbar";
import { getCurrentUser } from "../api/authApi";
import { useEffect, useState } from "react";
import { AuthProvider } from "../context/AuthContext";




const ProtectedRoute = () =>{
    const token = getAccessToken();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        
        if (!token) {
            setLoading(false);
            return;
        }
        
        const fetchCurrentUser = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchCurrentUser();
    }, []);
    

    if (!token){
        return <Navigate to="/login" />;
    }

    if (loading) {
        return(
            <div className="flex min-h-screen items-center justify-center bg-slate-900">
                <p className="text-lg font-medium text-slate-400">
                    Loading...
                </p>
            </div>
        )
    }

    return (
        <AuthProvider value={{ user }}>
            <Navbar user={user} />
            <Outlet/>
        </AuthProvider>
    );
};

export default ProtectedRoute;