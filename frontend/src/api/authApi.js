import api from "./axiosInstance";

export const loginUser = (data)=>{
    return api.post("token/", data);
}

export const registerUser = (data)=>{
    return api.post("accounts/register/", data);
}


export const getCurrentUser = ()=>{
    return api.get("accounts/user/me/");
}