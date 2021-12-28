import { instance } from './httpService';

const http = instance;

export const getCurrentSessionSemester = () => {
    return http.get("/Session/Current")
}

export const updateSesssionSemester = (data) => {
    return http.post("/Session/Semester/New", data)
}