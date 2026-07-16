import api from "./axiosInstance";




export const getQuestions = (roleId)=>{
    return api.get(`questions/?role_id=${roleId}`);
}


export const getRoles = async()=>{
    const response = await api.get("roles/");
    return response.data;
}

export const getInterviews = async () => {
    const response = await api.get("interviews/");
    return response.data;
}

export const getInterview = async (id) => {
    const response = await api.get(`interviews/${id}/`);
    return response.data;
}

export const createInterview = async (roleId) => {
    const response = await api.post("interviews/", {
        role: roleId,
    });

    return response.data;
};

export const submitInterview = (id, data) => {
    return api.post(`interviews/${id}/submit/`, data);
}


export const evaluateInterview = (id)=>{
    return api.post(`interviews/${id}/evaluate/`);
}


export const getEvaluation = (id) =>{
    return api.get(`interviews/${id}/evaluation/`);
}


