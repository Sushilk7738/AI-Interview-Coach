import { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = AuthContext.Provider;


export const useAuth = ()=> {
    return useContext(AuthContext);
}
