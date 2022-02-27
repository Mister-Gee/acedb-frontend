import { instance } from './httpService';

const http = instance;

export const getStudentChart = () => {
    return http.get("/Student/RegisteredStudent/LineChart")
}

export const getPartiallyRegisteredStudent = () => {
    return http.get("/Student/Partial/Get/All")
}

export const getFullyRegisteredStudent = () => {
    return http.get("/Student/Get/All")
}