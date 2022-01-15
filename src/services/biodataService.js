import { instance } from './httpService';

const http = instance;

export const getRegStatus = () => {
    return http.get("/Biodata/Registeration/Progress")
}

export const updateStudentBiodata = (Id, data) => {
    return http.put(`/Biodata/Student/Update/${Id}`, data)
}

export const imageUpload = (userID, data) => {
    return http.put(`/Biodata/Image/Upload/${userID}`, data)
}