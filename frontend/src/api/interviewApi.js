import api from "./axiosInstance";


export const getRoles = ()=>{
    return api.get("roles/");
}


export const getQuestions = (roleId)=>{
    return api.get(`questions/?role_id=${roleId}`);
}


export const getInterviews = ()=>{
    return api.get("interviews/");
}


export const createInterview = (data)=>{
    return api.post("interviews/", data);
}


export const submitInterview = (id, data) => {
    return api.post(`interviews/${id}/submit/`, data);
}


export const evaluateInterview = (id)=>{
    return api.post(`interviews/${id}/evaluate/`);
}


export const getEvaluation = (id) =>{
    return api.get(`interviews/${id}/evaluation/`);
}