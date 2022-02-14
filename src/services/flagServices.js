import { instance } from './httpService';

const http = instance;

export const getStudentFlag = (StudentID) => {
    return http.get(`/Flag/Students/Get/StudentID/${StudentID}`)
}

export const getAllFlagLevel = () => {
    return http.get("/ControlledData/FlagLevel/All")
}

export const getAllFlags = () => {
    return http.get("/Flag/Students/All")
}

export const getAllSecurityFlags = (SecurityID) => {
    return http.get(`/Flag/Security/Get/Flags/${SecurityID}`)
}

export const getStudentFlagStatus = (StudentID) => {
    return http.get(`/Flag/Student/Status/{StudentID}`)
}

export const flagStudent= (data) => {
    return http.post("/Flag/Student/Flag", data)
}

export const createFlagLevel= (data) => {
    return http.post("/ControlledData/FlagLevel/Create", data)
}
