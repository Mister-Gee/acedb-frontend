import { instance } from './httpService';

const http = instance;


export const getStudentLogin = (data) => {
    return http.post("/api/sme/authentication/signin/", data)
}


export const getStudentProfile = (data) => {
    return http.post(`/api/SUDENTPROFILEAPI/${data.id}`, data)
}

export const getStudentChart = () => {
    return http.get("/Student/RegisteredStudent/LineChart")
}