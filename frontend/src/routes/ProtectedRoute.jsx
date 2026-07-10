import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../utils/token";


const ProtectedRoute = () =>{
    const token = getAccessToken();

    if (!token){
        return <Navigate to="/login" />;
    }

    return <Outlet/>;
};

export default ProtectedRoute;