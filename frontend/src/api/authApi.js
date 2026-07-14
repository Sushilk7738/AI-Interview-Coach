import api from "./axiosInstance";

export const loginUser = (data)=>{
    return api.post("token/", data);
}

export const registerUser = (data)=>{
    return api.post("accounts/register/", data);
}

export const getCurrentUser = async () => {
    const response = await api.get("accounts/user/me/");
    return response.data;
};


export const refreshAccessToken = async (refresh) =>{
    const response = await api.post("token/refresh/", {
        refresh,
    });
    
    return response.data
}